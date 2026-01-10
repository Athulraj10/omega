import { DotIcon } from "@/assets/icons";
import { formatMessageTime } from "@/lib/format-message-time";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentUsers } from "@/components/redux/action/dashboard/dashboardAction";
import { RootState } from "@/components/redux/reducer";

export function ChatsCard() {
  const dispatch = useDispatch();
  const { recentUsers, loading } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(fetchRecentUsers(10));
  }, [dispatch]);

  // Transform backend data to match UI format
  const transformedUsers = recentUsers.map((user: any) => {
    // Backend returns user objects directly from getRecentUsers
    return {
      id: user.id || user._id,
      name: user.name || `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.email || "Unknown User",
      profile: user.profile || user.profile_pic || "/images/user/user-01.png",
      isActive: user.isActive !== undefined 
        ? user.isActive 
        : (user.lastActive && (user.lastActive instanceof Date ? user.lastActive.getTime() > (Date.now() - 5 * 60 * 1000) : new Date(user.lastActive).getTime() > (Date.now() - 5 * 60 * 1000))),
      lastMessage: user.lastMessage || {
        content: user.lastMessage?.content || "Welcome to our platform!",
        type: user.lastMessage?.type || "text",
        timestamp: user.lastMessage?.timestamp || user.lastActive || user.joinedDate || user.createdAt || new Date().toISOString(),
        isRead: user.lastMessage?.isRead !== undefined ? user.lastMessage.isRead : true,
      },
      unreadCount: user.unreadCount || 0,
    };
  });

  // Always use backend data - no static fallback
  const data = transformedUsers;

  return (
    <div className="col-span-12 rounded-[10px] bg-white py-6 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-4">
      <h2 className="mb-5.5 px-7.5 text-body-2xlg font-bold text-dark dark:text-white">
        Chats
      </h2>

      {loading.recentUsers && (
        <div className="px-7.5 py-3 text-sm text-gray-500 flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          Loading users...
        </div>
      )}

      {!loading.recentUsers && data.length === 0 && (
        <div className="px-7.5 py-3 text-sm text-gray-500">
          No recent users found
        </div>
      )}

      <ul>
        {data.map((chat, key) => (
          <li key={key}>
            <Link
              href="/"
              className="flex items-center gap-4.5 px-7.5 py-3 outline-none hover:bg-gray-2 focus-visible:bg-gray-2 dark:hover:bg-dark-2 dark:focus-visible:bg-dark-2"
            >
              <div className="relative shrink-0">
                <Image
                  src={chat.profile}
                  width={56}
                  height={56}
                  className="size-14 rounded-full object-cover"
                  alt={"Avatar for " + chat.name}
                />

                <span
                  className={cn(
                    "absolute bottom-0 right-0 size-3.5 rounded-full ring-2 ring-white dark:ring-dark-2",
                    chat.isActive ? "bg-green" : "bg-orange-light",
                  )}
                />
              </div>

              <div className="relative flex-grow">
                <h3 className="font-medium text-dark dark:text-white">
                  {chat.name}
                </h3>

                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "truncate text-sm font-medium dark:text-dark-5 xl:max-w-[8rem]",
                      chat.unreadCount && "text-dark-4 dark:text-dark-6",
                    )}
                  >
                    {chat.lastMessage.content}
                  </span>

                  <DotIcon />

                  <time
                    className="text-xs"
                    dateTime={chat.lastMessage.timestamp}
                  >
                    {formatMessageTime(chat.lastMessage.timestamp)}
                  </time>
                </div>

                {!!chat.unreadCount && (
                  <div className="pointer-events-none absolute right-0 top-1/2 aspect-square max-w-fit -translate-y-1/2 select-none rounded-full bg-primary px-2 py-0.5 text-sm font-medium text-white">
                    {chat.unreadCount}
                  </div>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
