export const setUnreadCount = (count) => {
    localStorage.setItem('unreadCount', count);
  };
  
  export const getUnreadCount = () => {
    return parseInt(localStorage.getItem('unreadCount') || '0', 10);
  };