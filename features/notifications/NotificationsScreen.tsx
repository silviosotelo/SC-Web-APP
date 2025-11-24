
import React, { useState } from 'react';
import { NOTIFICATIONS } from '../../constants';
import { Bell, CreditCard, Calendar, Info } from 'lucide-react';
import Skeleton from '../../components/ui/Skeleton';
import { useLoading } from '../../hooks/useLoading';

const NotificationsScreen: React.FC = () => {
  const isLoading = useLoading('notifications', 1000);

  const getIcon = (type: string) => {
      switch(type) {
          case 'appointment': return <Calendar size={20} />;
          case 'payment': return <CreditCard size={20} />;
          default: return <Info size={20} />;
      }
  };

  const getColor = (type: string) => {
    switch(type) {
        case 'appointment': return 'bg-teal-100 text-teal-600';
        case 'payment': return 'bg-orange-100 text-orange-600';
        default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white min-h-full animate-fadeIn">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-bold text-lg text-gray-800">Recordatorios</h2>
            <span className="text-xs text-primary-600 font-medium cursor-pointer">Marcar todo como leído</span>
        </div>

        <div className="divide-y divide-gray-100">
            {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="p-5 flex gap-4">
                        <Skeleton variant="circular" width={40} height={40} />
                        <div className="flex-1 space-y-2">
                            <Skeleton variant="text" width="80%" height={16} />
                            <Skeleton variant="text" width="100%" height={12} />
                            <Skeleton variant="text" width="30%" height={10} />
                        </div>
                    </div>
                ))
            ) : (
                NOTIFICATIONS.map(notif => (
                    <div key={notif.id} className={`p-5 flex gap-4 ${!notif.read ? 'bg-blue-50/30' : 'bg-white'}`}>
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${getColor(notif.type)}`}>
                            {getIcon(notif.type)}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className={`text-sm ${!notif.read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                                    {notif.title}
                                </h3>
                                {!notif.read && <div className="h-2 w-2 bg-red-500 rounded-full"></div>}
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed mb-2">{notif.message}</p>
                            <span className="text-[10px] text-gray-400">{notif.date}</span>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
  );
};

export default NotificationsScreen;
