# Инсталиране на Tanados Obsidian Tide 0.2.0

Свали **[Tanados Media Creator 0.2.1](https://helldragonpz.github.io/TanadosLinux-Downloads/#download)** за компютъра с Windows или Linux, от който ще създадеш флашката.
**Не е нужно първо да сваляш Linux.** Приложението само сваля официалния образ, проверява го, записва флашката и проверява целия запис.
Файловете са публични и не изискват GitHub акаунт. Образът на Linux остава 0.2.0; Media Creator е 0.2.1.

Отвори **[ръководството със снимки](https://helldragonpz.github.io/TanadosLinux-Downloads/install.html?lang=bg)**.
Нужни са x86-64 компютър, **16 GB+ флашка**, интернет и **10 GB свободно място** на компютъра, който подготвя USB. Кешираното ISO е 6.45 GB; използвай NTFS/exFAT или Linux файлова система, защото FAT32 не го побира.
За инсталацията: поне **4 GB RAM**, **40 GB** място и изключен Secure Boot. Запази важните файлове преди инсталация.

## Отвори Media Creator

На **Windows 10/11** разархивирай целия `Tanados-Media-Creator-0.2.1-Windows-x64.zip` и отвори `TanadosMediaCreator.exe`. Запази останалите файлове до EXE файла.

На **Ubuntu/Debian** инсталирай DEB и отвори **Tanados Media Creator** от менюто:

```bash
sudo apt install ./Tanados-Media-Creator-0.2.1-Linux-amd64.deb
```

Linux portable архивът е алтернатива за системи с работещ Chromium sandbox.

## Създай флашката автоматично

1. Включи флашката и отвори Media Creator.
2. Избери я по модел, сериен номер и размер.
3. Натисни **Create USB** и потвърди точния носител. **Всичко на тази флашка ще бъде изтрито.**
4. Приложението само сваля Tanados и проверява публикувания SHA-256. **Pause download** запазва напредъка, без да променя USB. След прекъсване натисни **Create USB** отново, за да продължиш.
5. Потвърди административния прозорец. На Linux томовете на избраната флашка се демонтират автоматично, без принудително демонтиране. Изчакай записът и пълната проверка.
6. При **Your installation USB is ready** извади безопасно флашката и продължи по-долу.

Системни дискове, носители без надеждна идентификация, малки флашки и сменено USB по време на операцията се блокират. Изтегленият образ се запазва и проверява отново при употреба — за втора флашка не е нужно второ сваляне.

## По избор: локално ISO или offline подготовка

Ако вече имаш ISO, отвори **Already have an ISO? Use a local file** в Media Creator. Остави `.sha256` файла до него. За приятел без интернет изпрати готовото ISO, контролния файл и Media Creator заедно.

Ръчно сваляне: **[готово ISO](https://wow.tanados.com/downloads/tanados-linux/0.2.0/Tanados-Obsidian-Tide-0.2.0-amd64.iso)** · **[SHA-256](https://wow.tanados.com/downloads/tanados-linux/0.2.0/Tanados-Obsidian-Tide-0.2.0-amd64.iso.sha256)**.
Имаме едно ISO от 6,446,008,320 bytes с SHA-256:

```text
3602f03448608cad93cbcbde550769b542aa751ab6c78a8ec8b704ea980777eb
```

Само като резервен вариант **[GitHub release](https://github.com/helldragonpz/TanadosLinux-Downloads/releases/tag/v0.2.0-tide-preview)** съдържа четири части на същото ISO заради лимита от 2 GiB на файл. Свали всички части и помощника в една папка с поне 16 GB свободни, след което изпълни на Windows:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\Join-Tanados-ISO.ps1
```

Или на Linux:

```bash
bash ./Join-Tanados-ISO.sh
```

Помощникът съединява и проверява ISO, без да записва върху диск. Избери получения образ от локалната опция в Media Creator. Source code ZIP не е инсталационно ISO. При Rufus избери **DD Image mode**.

## Стартирай и инсталирай

1. Запази важните файлове на целевия компютър. Свържи лаптопа към зарядното.
2. Изключи Secure Boot и избери **UEFI USB** от boot менюто.
3. Разгледай live desktop и провери дисплея, клавиатурата, мрежата и звука.
4. Отвори **Install Tanados**. Внимателно прегледай целевия диск и режима за разделяне. **Erase disk изтрива всички данни на избрания диск.** Dual boot и криптирана инсталация още не са валидирани за това издание.
5. След приключване извади флашката, когато бъдеш помолен, рестартирай и влез с акаунта, създаден в инсталатора.

От **Appearance** избери Tide, Copper или Glacier и шрифтовете за приложенията и терминала. **Aperture → Fit to leftmost display** поставя новия фон и прозрачния аудио ореол на най-левия монитор. **Fit to all displays** го прилага на всички монитори, с вертикална или хоризонтална композиция според ориентацията. Настройките на widget-а включват интензивност, цветове, пауза и намалено движение.

Health, Recovery, Updates и Laptop & Firmware са в Control Center. Lumi е по избор и първоначално е изключена. Подписаният desktop preview канал все още изисква достъп до частното repo; APT системните обновления и публичните инсталационни файлове не го изискват.

Физическа инсталация на PC/лаптоп, запис на USB от истински Windows, Secure Boot и recovery boot още не са преминали приемателните тестове за този образ. Виж **[провереното за версията](https://github.com/helldragonpz/TanadosLinux-Downloads/releases/tag/v0.2.0-tide-preview)**. При проблем изпрати модела на компютъра, GPU, firmware режима и стъпката, на която е възникнал. Log файлът на инсталатора е `/root/.cache/calamares/session.log` в live сесията; копирай го с администраторски достъп преди изключване.
