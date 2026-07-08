import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 채팅 페이지가 아닌 경우에만 스크롤을 최상단으로 이동
    if (!pathname.startsWith('/chats/')) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

export default ScrollToTop;