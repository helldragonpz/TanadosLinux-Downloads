# Tanados Gaming Journey 0.3.0 preview

Осем нови функции за по-лесно започване с Linux: проверка на игрите преди
инсталация, настройка с продължаване след рестарт, обща Game Library, запазване
на лично проверен Proton профил, защита на обновяванията при активна игра,
копиране на Steam файлове от Windows, звук/контролер/захранване и локална
диагностика през Lumi.

## Как да ги получиш

**ISO е 0.2.0.** Media Creator **0.3.0** включва новия каталог и автоматично
сваля този проверен ISO. Осемте desktop функции се добавят с подписаното
обновяване **0.3.0 preview** след инсталацията. Няма нов ISO, който да твърдим,
че е преминал boot/install проверките.

1. Инсталирай Tanados от [официалната страница](https://helldragonpz.github.io/TanadosLinux-Downloads/).
2. Затвори игрите и Steam.
3. Свали [Tanados-Gaming-Journey-0.3.0-Linux-amd64.tar.gz](https://github.com/helldragonpz/TanadosLinux-Downloads/releases/download/updates-preview/Tanados-Gaming-Journey-0.3.0-Linux-amd64.tar.gz).
4. Разархивирай го и отвори терминал в папката `Tanados-Gaming-Journey-0.3.0`.

```sh
bash Install-Tanados-Desktop.sh --verify preview
bash Install-Tanados-Desktop.sh --apply preview
```

Първата команда проверява фиксирания публичен ключ, Ed25519 подписа и SHA-256
на пакета. Втората проверява за активни игри и използва стандартния системен
диалог за парола за инсталирането. Инсталирай върху Tanados/Ubuntu 26.04 AMD64;
пакетът изисква Qt 6.10. Отвори **Gaming Setup** от менюто след обновяването.
Настройката поддържа български и английски и пази прогреса автоматично.

## Какво се променя

- Каталогът в сайта и Media Creator разделя Linux версията, предложения Proton
  маршрут, multiplayer ограниченията и личните Tanados тестове. Непознатите
  игри са непроверени; неподдържаните остават с предупреждение.
- Welcome води през връзка, устройства, магазини, игри и Play. Клиентите могат
  да се инсталират за текущия потребител от Flathub; акаунтите се въвеждат в тях.
- Game Library има Setup и **Check & profile** за избраната игра.
- След успешен личен тест запазваш поддържания Steam/Tanados Proton профил.
  Restore променя само тази игра, архивира текущия профил и пази другите игри.
- Новият System Hub отказва инсталирането на обновяване при открита активна
  игра. Новият канал за подписани пакети е публичен и не изисква GitHub акаунт.
- Steam файловете се копират от вече монтирана Windows библиотека в регистрирана
  Linux библиотека след преглед на мястото и размера. Източникът остава непокътнат,
  съществуващи цели не се презаписват. След копирането провери файловете в Steam.
- Избираш реален аудио изход/микрофон, отваряш KDE тестовете, Steam Big Picture
  и наличните power профили. GPU economy спира Resonance и 3D Lumi по време на
  открита игра и ги възстановява след нея; настройката може да се изключи.
- Lumi разбира **„провери играта [име]“** и **„поправи играта [име]“**. Чете
  реалния маршрут, достъпа до файловете, Vulkan и последната проследена сесия.
  Поправянето отваря прегледа за конкретната игра след потвърждение.

## Ограничения и проверка

Нито една от първите 21 игри още не е лично gameplay-тествана от Tanados.
Проверете конкретните игри, multiplayer и устройствата на вашия компютър.
Game Library couch mode използва клавиатурна навигация; Steam Big Picture
предоставя интерфейса за контролер. Независимо стартирани игри без Tanados
сесия или Steam/Proton маркери може да не бъдат открити от update guard.
Включете Btrfs Recovery в Control Center преди следващи системни обновявания.

Докладите за помощ се записват само локално, без автоматично изпращане.
[Проверки на изданието](GAMING-JOURNEY-VALIDATION.md).

## English

Install the accepted **0.2.0 ISO**, close games and Steam, download/extract the
signed Gaming Journey archive above and run the two verification/install commands.
The package targets Tanados/Ubuntu 26.04 AMD64 with Qt 6.10. Open **Gaming Setup**
afterward and select EN. The eight features are delivered by the **0.3.0 preview
desktop update**; Media Creator 0.3.0 adds the pre-install game checker and still
downloads ISO 0.2.0. No game is marked personally gameplay-verified by Tanados.
