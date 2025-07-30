import { useEffect, useState } from "react";

type UserStatusProps = {
    id: number;
};

const UserStatus: React.FC<UserStatusProps> = ({ id }) => {
    const [isOnline, setIsOnline] = useState<boolean>(false);

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const res = await fetch(`/user/${id}/online`);
                const data = await res.json();
                setIsOnline(data.online);
            } catch (error) {
                console.error("Error fetching user status:", error);
            }
        };

        checkStatus();
        const interval = setInterval(checkStatus, 60000); // Cek setiap 1 menit

        return () => clearInterval(interval);
    }, [id]);

    return (
        <span className="flex items-center gap-2">
            {isOnline ? "🟢 Online" : "⚪ Offline"}
        </span>
    );
};

export default UserStatus;
