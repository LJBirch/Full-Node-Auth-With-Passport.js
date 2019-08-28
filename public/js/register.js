document.addEventListener('DOMContentLoaded', () => {
  const notifications = document.querySelectorAll('.notification')
  if (notifications) {
    notifications.forEach(notification => {
      notification.firstElementChild.addEventListener('click', () => {
        notification.parentNode.removeChild(notification)
      })
    })
  }
})
