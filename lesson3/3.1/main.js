const cancel = 'Шкода, що Ви не захотіли ввести дані про ';
const currentYear = new Date().getFullYear();
const capitals = {
    "Лондон" : "Великобританія",
    "Вашингтон" : "США",
    "Київ" : "Україна",
}
const sports = {
    "Футбол" : "як Ліонєля Мєссі",
    "Баскетбол" : "як Майкл Джексон",
    "Кіберспорт" : "горбатим як Сімпл",
}
let birthday = prompt('У якому році ви народилися?')?.trim();
let city = prompt('Місто проживання?')?.trim();
let sport = prompt('Ваш улюблений спорт?')?.trim();

birthday ? birthday = `Ваш вік приблизно ${currentYear - (+birthday)} років.` : birthday = cancel + 'рік народження.';

if (city) {
    for (const key in capitals) {
        if (city.toLowerCase() === key.toLowerCase()) {
            city = `Ви живете у столиці країни ${capitals[key]}.`;
            break;
        }
    }
    if (!city.includes('столиці країни')) {
        city = `Ви живете у місті ${city}.`;
    }
} else {
    city = cancel + 'місто проживання.';
}

if (sport) {
    for (const key in sports) {
        if (sport.toLowerCase() === key.toLowerCase()) {
            sport = `Круто! Хочеш стати таким ${sports[key]}?`;
            break;
        }
    }
    if (!sport.includes('стати таким')) {
        sport = `Ви любите такий спорт як ${sport}.`;
    }
} else {
    sport = cancel + 'спорт.';
}

alert(`${birthday}\n${city}\n${sport}`)