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

## Hero

Файл `hero-tbilisi.jpg` — фон главного экрана (`#top`), также используется как
og:image / twitter:image / schema.org image для соцсетей и поисковиков.
Управляется через админку (`admin.html`, раздел «Главный экран»).

Старые фото Toyota Alphard из прежнего слайдера (`slot-1`…`slot-5`,
`bonus-exterior-rear`) удалены вместе со слайдером — больше не используются.
