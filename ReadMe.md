# Quiz Fever
Система за създадване, управление, на свадбени събития със свободен достъп.

## Функционалност
* Регистрация на потребители
* Възможност за разглеждане на събития от други потребители
* Възможност за изпрашане на пожелания от други потребители
* Възможност за съзздаване на сватбени събития от регистрирани потребители
* Интерактивен редактор за създаване и упражление на списъци с гости по маси!!
* Интерактивен, гъвкав UX

## Технологии
* HTML, CSS, JavaScript
* lit-html, page
* GitHub Pages, Back4app

## Екрани (Страници)
* **Welcome Screen** (landing page)
* **Login/Regsiter** - регистрация с мейл, потребителско име, парола
* **Wedding** 
* **Wedding Create** 
* **Wedding Catalog** 
* **Weding Details** 
* **Story** 
* **Story Create** 
* **Events** 
* **Events Create** 
* **GuestList** 
* **GuestList Create** 
* **Wishes** 
* **Wishes Create** 

## План за изпълнение
### Part 1
* Създаване и настройване на приложение в Back4app
* Деплойване на приложение в GitHub Pages
* Login/Register страница
* Wedding Create функционалност

### Part 2
* Довършване на структура и стилизация
* Welcome Screen
* Quiz Browser
* Quiz Details
* Quiz Contest Mode
* Quiz Results
* Profile Page

## Реализация
### Структура на данните
#### Колекции
* Sessions (служебна)
* Users (служебна)
```javascript
{
    email: String,
    username: String,
    password: String
}
```
* Weddings
```javascript
{
    date: DateTime
    title: String,
    brideName: String,
    brideStory: Number,
    groomName: String,
    groomStory: Number
    ownerId:  Pointer<User>

}
```

#### Контрол на достъпа
* Гостите могат да се регистрират, да преглеждат каталога, детайлите на сватбите
* Регистрираните потребители могат да създават сватбени събирия, сяисъци с гости(по маси), график на събитията. 
* Само създателя на едина сватба може да я редактира и изтрива
* Всеки регистриран потребител може да решава чужд тест



