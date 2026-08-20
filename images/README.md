# Фото

## Автопарк

Секция «Автопарк» на главной странице — сетка из 8 карточек, у каждой своё
фото (см. `index.html`, `ru.html`, `ka.html`, секция `#fleet`):

| Файл | Автомобиль |
|---|---|
| `Toyota Camry.jpg` | Toyota Camry |
| `Mercedes-Benz S-Class VIP.jpg` | Mercedes-Benz S-Class VIP |
| `Toyota Alphard 2018 Business.webp` | Toyota Alphard Business |
| `Mercedes-Benz VITO.webp` | Mercedes-Benz VITO |
| `Mercedes-Benz V-CLASS VIP.png` | Mercedes-Benz V-Class VIP |
| `Mercedes-Benz SPRINTER.jpg` | Mercedes-Benz Sprinter |
| `Mercedes-Benz SPRINTER LONG.jpg` | Mercedes-Benz Sprinter Long |
| `Mercedes-Benz SPRINTER VIP.png` | Mercedes-Benz Sprinter VIP |

Кадрирование в карточках — по центру через `object-fit: cover` (соотношение 4:3).

## Hero и прочие слоты

Слоты `hero`, `slot1`–`slot5` управляются через админку (`admin.html`,
раздел «Главный экран») и используются как фон главного экрана и запасные
изображения; больше не привязаны к слайдеру (слайдер в «Автопарке» удалён).
