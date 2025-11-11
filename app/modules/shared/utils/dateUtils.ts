/**
 * Утилита для форматирования дат в удобочитаемый формат
 */

/**
 * Форматирует дату в удобочитаемый формат относительно текущей даты
 * @param dateString - дата в формате DD-MM-YYYY или ISO строке
 * @returns строка с описанием времени (например, "Сегодня", "Вчера", "2 дня назад")
 */
export function formatRelativeDate(dateString: string): string {
  // Парсим дату в формате DD-MM-YYYY
  let date: Date
  
  if (dateString.includes('-') && dateString.split('-').length === 3) {
    const parts = dateString.split('-')
    const day = parseInt(parts[0])
    const month = parseInt(parts[1])
    const year = parseInt(parts[2])
    date = new Date(year, month - 1, day)
  } else {
    date = new Date(dateString)
  }
  
  // Проверяем валидность даты
  if (isNaN(date.getTime())) {
    return dateString // Возвращаем исходную строку если не удалось распарсить
  }
  
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  const diffInWeeks = Math.floor(diffInDays / 7)
  const diffInMonths = Math.floor(diffInDays / 30)
  const diffInYears = Math.floor(diffInDays / 365)
  
  // Сегодня
  if (diffInDays === 0) {
    return 'Сегодня'
  }
  
  // Вчера
  if (diffInDays === 1) {
    return 'Вчера'
  }
  
  // Позавчера
  if (diffInDays === 2) {
    return 'Позавчера'
  }
  
  // 3-6 дней назад
  if (diffInDays >= 3 && diffInDays <= 6) {
    return `${diffInDays} дня назад`
  }
  
  // Неделя назад
  if (diffInDays === 7) {
    return 'Неделю назад'
  }
  
  // 2-3 недели назад
  if (diffInWeeks >= 2 && diffInWeeks <= 3) {
    return `${diffInWeeks} недели назад`
  }
  
  // Месяц назад
  if (diffInMonths === 1) {
    return 'Месяц назад'
  }
  
  // 2-5 месяцев назад
  if (diffInMonths >= 2 && diffInMonths <= 5) {
    return `${diffInMonths} месяца назад`
  }
  
  // Полгода назад
  if (diffInMonths >= 6 && diffInMonths < 12) {
    return 'Полгода назад'
  }
  
  // Год назад
  if (diffInYears === 1) {
    return 'Год назад'
  }
  
  // Полтора года назад
  if (diffInYears === 1 && diffInMonths >= 6) {
    return 'Полтора года назад'
  }
  
  // 2-9 лет назад
  if (diffInYears >= 2 && diffInYears <= 9) {
    return `${diffInYears} года назад`
  }
  
  // Очень давно
  if (diffInYears >= 10) {
    return 'Очень давно'
  }
  
  // Fallback для неожиданных случаев
  return `${diffInDays} дней назад`
}

/**
 * Форматирует дату в полный формат (например, "20 октября 2025 г.")
 * @param dateString - дата в формате DD-MM-YYYY или ISO строке
 * @returns строка с полной датой
 */
export function formatFullDate(dateString: string): string {
  // Парсим дату в формате DD-MM-YYYY
  let date: Date
  
  if (dateString.includes('-') && dateString.split('-').length === 3) {
    const parts = dateString.split('-')
    const day = parseInt(parts[0])
    const month = parseInt(parts[1])
    const year = parseInt(parts[2])
    date = new Date(year, month - 1, day)
  } else {
    date = new Date(dateString)
  }
  
  // Проверяем валидность даты
  if (isNaN(date.getTime())) {
    return dateString // Возвращаем исходную строку если не удалось распарсить
  }
  
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

