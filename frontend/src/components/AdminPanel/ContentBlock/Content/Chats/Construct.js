import React, { useState, useEffect, useRef } from "react";
import Skeleton from "@mui/material/Skeleton"; // Импортируем Skeleton

const Chats = () => {
    const [isLoading, setIsLoading] = useState(true); // Состояние загрузки
    const iframeRef = useRef(null); // Ссылка на iframe

    useEffect(() => {
        const iframe = iframeRef.current; // Получаем текущий элемент iframe

        if (iframe) {
            // Устанавливаем обработчик onload
            iframe.onload = () => {
                setIsLoading(false); // Убираем прелоадер после загрузки

                try {
                    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

                    // Убираем display: none у тега <html>
                    if (iframeDocument.documentElement && iframeDocument.documentElement.style.display === 'none') {
                        iframeDocument.documentElement.style.display = 'block';
                    }
                } catch {}
            };
        }
    }, []); // Пустой массив зависимостей, чтобы эффект выполнился только один раз

    return (
        <div style={{ width: '100%', height: '100%' }}>
            {/* Прелоадер (Skeleton) */}
            {isLoading && (
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    animation="wave"/>
            )}

            {/* iframe */}
            <iframe
                ref={iframeRef}
                src="https://servebiz.space/proxy/"
                title="Telegram Web Proxy"
                width="100%"
                height="100%"
                style={{ border: 'none', display: isLoading ? 'none' : 'block' }} // Скрываем iframe во время загрузки
                sandbox="allow-forms allow-scripts allow-same-origin allow-top-navigation-by-user-activation"
                allow="encrypted-media"
                allowFullScreen/>
        </div>
    );
};

export default Chats;