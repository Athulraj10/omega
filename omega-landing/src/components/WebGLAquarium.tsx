"use client";

import { useEffect, useRef, useState } from "react";

interface Fish {
  x: number;
  y: number;
  z: number;
  angle: number;
  speed: number;
  size: number;
  type: number;
  tailPhase: number;
  bodyPhase: number;
}

export default function WebGLAquarium() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const fishRef = useRef<Fish[]>([]);
  const timeRef = useRef(0);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      setIsSupported(false);
      return;
    }

    glRef.current = gl;

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Vertex shader source
    const vertexShaderSource = `
      attribute vec3 a_position;
      attribute vec3 a_normal;
      attribute vec2 a_texCoord;
      
      uniform mat4 u_modelViewMatrix;
      uniform mat4 u_projectionMatrix;
      uniform mat4 u_normalMatrix;
      
      varying vec3 v_normal;
      varying vec3 v_position;
      varying vec2 v_texCoord;
      
      void main() {
        gl_Position = u_projectionMatrix * u_modelViewMatrix * vec4(a_position, 1.0);
        v_normal = normalize((u_normalMatrix * vec4(a_normal, 0.0)).xyz);
        v_position = (u_modelViewMatrix * vec4(a_position, 1.0)).xyz;
        v_texCoord = a_texCoord;
      }
    `;

    // Fragment shader source
    const fragmentShaderSource = `
      precision mediump float;
      
      uniform vec3 u_lightDirection;
      uniform vec3 u_lightColor;
      uniform vec3 u_ambientColor;
      uniform vec3 u_fishColor;
      uniform float u_time;
      
      varying vec3 v_normal;
      varying vec3 v_position;
      varying vec2 v_texCoord;
      
      void main() {
        vec3 normal = normalize(v_normal);
        vec3 lightDir = normalize(u_lightDirection);
        
        float diff = max(dot(normal, lightDir), 0.0);
        vec3 diffuse = u_lightColor * diff;
        
        // Add specular highlight
        vec3 viewDir = normalize(-v_position);
        vec3 reflectDir = reflect(-lightDir, normal);
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
        vec3 specular = u_lightColor * spec * 0.5;
        
        vec3 color = u_fishColor * (u_ambientColor + diffuse) + specular;
        
        // Add subtle animation based on position
        float wave = sin(u_time * 2.0 + v_position.x * 0.1) * 0.1 + 1.0;
        color *= wave;
        
        gl_FragColor = vec4(color, 0.85);
      }
    `;

    // Compile shader
    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    };

    // Create shader program
    const createProgram = (): WebGLProgram | null => {
      const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
      const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

      if (!vertexShader || !fragmentShader) return null;

      const program = gl.createProgram();
      if (!program) return null;

      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program linking error:", gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }

      return program;
    };

    const program = createProgram();
    if (!program) return;

    // Get attribute and uniform locations
    const positionLoc = gl.getAttribLocation(program, "a_position");
    const normalLoc = gl.getAttribLocation(program, "a_normal");
    const texCoordLoc = gl.getAttribLocation(program, "a_texCoord");
    const modelViewMatrixLoc = gl.getUniformLocation(program, "u_modelViewMatrix");
    const projectionMatrixLoc = gl.getUniformLocation(program, "u_projectionMatrix");
    const normalMatrixLoc = gl.getUniformLocation(program, "u_normalMatrix");
    const lightDirectionLoc = gl.getUniformLocation(program, "u_lightDirection");
    const lightColorLoc = gl.getUniformLocation(program, "u_lightColor");
    const ambientColorLoc = gl.getUniformLocation(program, "u_ambientColor");
    const fishColorLoc = gl.getUniformLocation(program, "u_fishColor");
    const timeLoc = gl.getUniformLocation(program, "u_time");

    // Create fish geometry - realistic fish shape
    const createFishGeometry = (size: number) => {
      const vertices: number[] = [];
      const normals: number[] = [];
      const texCoords: number[] = [];
      const indices: number[] = [];
      let vertexIndex = 0;

      // Helper function to add vertex with normal
      const addVertex = (x: number, y: number, z: number, nx: number, ny: number, nz: number, u: number, v: number) => {
        vertices.push(x, y, z);
        const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
        normals.push(nx / len, ny / len, nz / len);
        texCoords.push(u, v);
      };

      // Helper to add triangle
      const addTriangle = (a: number, b: number, c: number) => {
        indices.push(a, b, c);
      };

      const bodyLength = size;
      const bodyWidth = size * 0.3;
      const bodyHeight = size * 0.25;
      const segments = 12;
      const lengthSegments = 16;

      // Create fish body (elongated, tapered from head to tail)
      for (let i = 0; i <= lengthSegments; i++) {
        const t = i / lengthSegments; // 0 to 1 along body length
        const z = (t - 0.5) * bodyLength; // Center at origin
        
        // Width and height taper from head to tail
        const widthScale = t < 0.3 ? 1.0 : (1.0 - (t - 0.3) * 1.2); // Wider at head
        const heightScale = t < 0.3 ? 1.0 : (1.0 - (t - 0.3) * 1.2);
        const currentWidth = bodyWidth * Math.max(0.3, widthScale);
        const currentHeight = bodyHeight * Math.max(0.3, heightScale);

        for (let j = 0; j <= segments; j++) {
          const phi = (j / segments) * Math.PI * 2;
          const x = currentWidth * Math.cos(phi);
          const y = currentHeight * Math.sin(phi);

          // Normal calculation
          const nx = Math.cos(phi);
          const ny = Math.sin(phi);
          const nz = 0;

          addVertex(x, y, z, nx, ny, nz, j / segments, t);
        }
      }

      // Connect body segments
      for (let i = 0; i < lengthSegments; i++) {
        for (let j = 0; j < segments; j++) {
          const current = i * (segments + 1) + j;
          const next = current + segments + 1;
          addTriangle(current, next, current + 1);
          addTriangle(next, next + 1, current + 1);
        }
      }

      vertexIndex = vertices.length / 3;

      // Tail fin (at the back)
      const tailStart = bodyLength * 0.45;
      const tailWidth = size * 0.4;
      const tailHeight = size * 0.3;
      const tailSegments = 8;

      for (let i = 0; i <= tailSegments; i++) {
        const t = i / tailSegments;
        const z = tailStart + t * size * 0.2;
        const width = tailWidth * (1 - t * 0.7);
        const height = tailHeight * (1 - t * 0.5);

        for (let j = 0; j <= tailSegments; j++) {
          const phi = (j / tailSegments) * Math.PI;
          const x = width * Math.sin(phi);
          const y = height * Math.cos(phi) * 0.5;

          const nx = Math.sin(phi);
          const ny = Math.cos(phi) * 0.5;
          const nz = 0;

          addVertex(x, y, z, nx, ny, nz, j / tailSegments, t);
        }
      }

      // Connect tail segments
      const tailStartIndex = vertexIndex;
      for (let i = 0; i < tailSegments; i++) {
        for (let j = 0; j < tailSegments; j++) {
          const current = tailStartIndex + i * (tailSegments + 1) + j;
          const next = current + tailSegments + 1;
          addTriangle(current, next, current + 1);
          addTriangle(next, next + 1, current + 1);
        }
      }

      vertexIndex = vertices.length / 3;

      // Dorsal fin (top fin)
      const dorsalStart = -bodyLength * 0.2;
      const dorsalEnd = bodyLength * 0.2;
      const dorsalHeight = size * 0.35;
      const dorsalSegments = 6;

      for (let i = 0; i <= dorsalSegments; i++) {
        const t = i / dorsalSegments;
        const z = dorsalStart + t * (dorsalEnd - dorsalStart);
        const height = dorsalHeight * Math.sin(t * Math.PI);

        for (let j = 0; j <= 4; j++) {
          const side = (j / 4) * 2 - 1; // -1 to 1
          const x = size * 0.15 * side;
          const y = bodyHeight * 0.5 + height * (1 - Math.abs(side) * 0.3);

          const nx = side;
          const ny = 0.5;
          const nz = 0;

          addVertex(x, y, z, nx, ny, nz, j / 4, t);
        }
      }

      // Connect dorsal fin
      const dorsalStartIndex = vertexIndex;
      for (let i = 0; i < dorsalSegments; i++) {
        for (let j = 0; j < 4; j++) {
          const current = dorsalStartIndex + i * 5 + j;
          const next = current + 5;
          addTriangle(current, next, current + 1);
          addTriangle(next, next + 1, current + 1);
        }
      }

      return { vertices, normals, texCoords, indices };
    };

    // Create buffer
    const createBuffer = (data: number[]): WebGLBuffer | null => {
      const buffer = gl.createBuffer();
      if (!buffer) return null;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
      return buffer;
    };

    const createIndexBuffer = (data: number[]): WebGLBuffer | null => {
      const buffer = gl.createBuffer();
      if (!buffer) return null;
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);
      return buffer;
    };

    // Initialize fish
    const fishCount = 15;
    const fishGeometries: { [key: number]: any } = {};

    // Pre-create geometries and buffers for different sizes
    const sizeKeys = [3, 4, 5, 6, 7];
    sizeKeys.forEach(key => {
      const size = key * 0.1;
      const geometry = createFishGeometry(size);
      geometry.positionBuffer = createBuffer(geometry.vertices);
      geometry.normalBuffer = createBuffer(geometry.normals);
      geometry.texCoordBuffer = createBuffer(geometry.texCoords);
      geometry.indexBuffer = createIndexBuffer(geometry.indices);
      geometry.buffer = true;
      fishGeometries[key] = geometry;
    });

    for (let i = 0; i < fishCount; i++) {
      const size = Math.random() * 0.4 + 0.3; // Larger, more visible fish
      const z = (Math.random() - 0.5) * 2;
      fishRef.current.push({
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 4,
        z: z,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
        size: size,
        type: Math.floor(Math.random() * 5), // 5 different fish types
        tailPhase: Math.random() * Math.PI * 2,
        bodyPhase: Math.random() * Math.PI * 2,
      });
    }

    // Matrix utilities
    const createPerspectiveMatrix = (fov: number, aspect: number, near: number, far: number): number[] => {
      const f = 1.0 / Math.tan(fov / 2);
      const rangeInv = 1.0 / (near - far);

      return [
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (near + far) * rangeInv, -1,
        0, 0, near * far * rangeInv * 2, 0
      ];
    };

    const createLookAtMatrix = (eyeX: number, eyeY: number, eyeZ: number,
                                 centerX: number, centerY: number, centerZ: number,
                                 upX: number, upY: number, upZ: number): number[] => {
      let fx = centerX - eyeX;
      let fy = centerY - eyeY;
      let fz = centerZ - eyeZ;

      const rlf = 1.0 / Math.sqrt(fx * fx + fy * fy + fz * fz);
      fx *= rlf;
      fy *= rlf;
      fz *= rlf;

      let sx = fy * upZ - fz * upY;
      let sy = fz * upX - fx * upZ;
      let sz = fx * upY - fy * upX;

      const rls = 1.0 / Math.sqrt(sx * sx + sy * sy + sz * sz);
      sx *= rls;
      sy *= rls;
      sz *= rls;

      const ux = sy * fz - sz * fy;
      const uy = sz * fx - sx * fz;
      const uz = sx * fy - sy * fx;

      return [
        sx, ux, -fx, 0,
        sy, uy, -fy, 0,
        sz, uz, -fz, 0,
        -(sx * eyeX + sy * eyeY + sz * eyeZ),
        -(ux * eyeX + uy * eyeY + uz * eyeZ),
        fx * eyeX + fy * eyeY + fz * eyeZ,
        1
      ];
    };

    const multiplyMatrices = (a: number[], b: number[]): number[] => {
      const result: number[] = [];
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          let sum = 0;
          for (let k = 0; k < 4; k++) {
            sum += a[i * 4 + k] * b[k * 4 + j];
          }
          result[i * 4 + j] = sum;
        }
      }
      return result;
    };

    const createTranslationMatrix = (x: number, y: number, z: number): number[] => {
      return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        x, y, z, 1
      ];
    };

    const createRotationMatrix = (angle: number, axisX: number, axisY: number, axisZ: number): number[] => {
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      const t = 1 - c;
      const x = axisX;
      const y = axisY;
      const z = axisZ;

      return [
        t * x * x + c, t * x * y - s * z, t * x * z + s * y, 0,
        t * x * y + s * z, t * y * y + c, t * y * z - s * x, 0,
        t * x * z - s * y, t * y * z + s * x, t * z * z + c, 0,
        0, 0, 0, 1
      ];
    };

    const createScaleMatrix = (x: number, y: number, z: number): number[] => {
      return [
        x, 0, 0, 0,
        0, y, 0, 0,
        0, 0, z, 0,
        0, 0, 0, 1
      ];
    };

    const transposeMatrix = (m: number[]): number[] => {
      return [
        m[0], m[4], m[8], m[12],
        m[1], m[5], m[9], m[13],
        m[2], m[6], m[10], m[14],
        m[3], m[7], m[11], m[15]
      ];
    };

    // Enable depth testing and blending
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0.05, 0.15, 0.25, 0.05);

    // Animation loop
    const animate = () => {
      if (!gl || !program) return;

      timeRef.current += 0.016;

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      const aspect = canvas.width / canvas.height;
      const projectionMatrix = createPerspectiveMatrix(Math.PI / 4, aspect, 0.1, 100);
      const viewMatrix = createLookAtMatrix(0, 0, 5, 0, 0, 0, 0, 1, 0);

      gl.useProgram(program);

      // Set lighting uniforms
      gl.uniform3f(lightDirectionLoc, 0.5, 0.5, 1.0);
      gl.uniform3f(lightColorLoc, 1.0, 1.0, 1.0);
      gl.uniform3f(ambientColorLoc, 0.3, 0.3, 0.4);
      gl.uniform1f(timeLoc, timeRef.current);

      // Update and draw fish
      for (let i = 0; i < fishRef.current.length; i++) {
        const fish = fishRef.current[i];
        
        // Update fish position
        fish.x += Math.cos(fish.angle) * fish.speed;
        fish.y += Math.sin(fish.angle) * fish.speed * 0.5 + Math.sin(timeRef.current + fish.bodyPhase) * 0.01;
        fish.z += Math.sin(timeRef.current * 0.5 + fish.bodyPhase) * 0.01;

        // Boundary check
        if (Math.abs(fish.x) > 2) fish.angle = Math.PI - fish.angle;
        if (Math.abs(fish.y) > 2) fish.angle = -fish.angle;
        if (Math.abs(fish.z) > 1) fish.z *= -0.9;

        // Random direction changes
        if (Math.random() < 0.01) {
          fish.angle += (Math.random() - 0.5) * 0.5;
        }

        fish.tailPhase += 0.1;
        fish.bodyPhase += 0.05;

        // Create model matrix
        const translation = createTranslationMatrix(fish.x, fish.y, fish.z);
        const rotationY = createRotationMatrix(fish.angle, 0, 1, 0);
        const rotationZ = createRotationMatrix(Math.sin(fish.tailPhase) * 0.2, 0, 0, 1);
        const scale = createScaleMatrix(fish.size, fish.size, fish.size);

        let modelMatrix = multiplyMatrices(translation, rotationY);
        modelMatrix = multiplyMatrices(modelMatrix, rotationZ);
        modelMatrix = multiplyMatrices(modelMatrix, scale);

        const modelViewMatrix = multiplyMatrices(viewMatrix, modelMatrix);
        const normalMatrix = transposeMatrix(modelViewMatrix);

        // Set matrices
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, modelViewMatrix);
        gl.uniformMatrix4fv(projectionMatrixLoc, false, projectionMatrix);
        gl.uniformMatrix4fv(normalMatrixLoc, false, normalMatrix);

        // Set fish color based on type - more vibrant and fish-like colors
        const colors = [
          [0.1, 0.4, 0.8], // Deep blue
          [0.2, 0.6, 0.5], // Teal/Green
          [0.8, 0.5, 0.2], // Orange/Gold
          [0.7, 0.3, 0.6], // Purple
          [0.9, 0.7, 0.3], // Yellow/Gold
        ];
        const color = colors[fish.type % colors.length];
        gl.uniform3f(fishColorLoc, color[0], color[1], color[2]);

        // Get geometry (use closest size bucket)
        const sizeKey = Math.min(7, Math.max(3, Math.round(fish.size * 10)));
        const geometry = fishGeometries[sizeKey];
        if (!geometry || !geometry.buffer) continue;

        // Bind and draw
        gl.bindBuffer(gl.ARRAY_BUFFER, geometry.positionBuffer);
        gl.enableVertexAttribArray(positionLoc);
        gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, geometry.normalBuffer);
        gl.enableVertexAttribArray(normalLoc);
        gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, geometry.texCoordBuffer);
        gl.enableVertexAttribArray(texCoordLoc);
        gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.indexBuffer);
        gl.drawElements(gl.TRIANGLES, geometry.indices.length, gl.UNSIGNED_SHORT, 0);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  if (!isSupported) {
    return (
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-gradient-to-b from-blue-900/20 to-blue-950/20" />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1]"
      style={{ background: "transparent" }}
    />
  );
}

