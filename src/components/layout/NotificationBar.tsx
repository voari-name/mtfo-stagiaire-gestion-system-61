
import React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, X } from "lucide-react";
import { useNotifications } from "@/contexts/NotificationContext";

export const NotificationBar = () => {
  const { notifications, markAsRead, clearNotifications } = useNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return '📢';
    }
  };

  const getNotificationBgColor = (type: string, read: boolean) => {
    if (read) return "bg-gray-50 border-gray-200";
    
    switch (type) {
      case 'success':
        return "bg-green-50 border-green-200";
      case 'error':
        return "bg-red-50 border-red-200";
      case 'warning':
        return "bg-yellow-50 border-yellow-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative hover-scale transition-all duration-300">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 animate-scale-in">
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 animate-fade-in">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium leading-none">Notifications</h4>
            {notifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearNotifications}
                className="h-8 px-2 text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                Effacer tout
              </Button>
            )}
          </div>
          
          {notifications.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Aucune notification
            </p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 hover:bg-gray-50 ${getNotificationBgColor(notification.type, notification.read)}`}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">{getNotificationIcon(notification.type)}</span>
                        <p className="font-medium text-sm">{notification.title}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                      )}
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification.id);
                          }}
                          className="h-6 w-6 p-0"
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
