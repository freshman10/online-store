import { DataObject } from './types';

export const SORTING_CONDITIONS = {
    'By name, increasing': (data: DataObject[]): DataObject[] => data.sort((a, b) => a.name.localeCompare(b.name)),
    'By name, decreasing': (data: DataObject[]): DataObject[] => data.sort((a, b) => b.name.localeCompare(b.name)),
    'By year, increasing': (data: DataObject[]): DataObject[] => data.sort((a, b) => a.age - b.age),
    'By year, decreasing': (data: DataObject[]): DataObject[] => data.sort((a, b) => b.age - a.age),
    'By quantity, increasing': (data: DataObject[]): DataObject[] => data.sort((a, b) => a.items - b.items),
    'By quantity, decreasing': (data: DataObject[]): DataObject[] => data.sort((a, b) => b.items - a.items),
};
export const reserButtons: string[] = ['filters', 'setting'];
export const basketItemsStorage: string[] = [];
export const MINUS_ONE = -1;
export const ZERO = 0;
export const ONE = 1;
export const TWENTY = 20;
export const DIV = 'div';
export const P = 'p';
export const A = 'a';
export const BUTTON = 'button';
export const CLICK = 'click';
export const CHANGE = 'change';
export const UPDATE = 'update';
export const MAIN = 'main';
export const H1 = 'h1';
export const H2 = 'h2';
export const H3 = 'h3';
export const IMG = 'img';
export const HREF = 'href';
export const FORM = 'form';
export const SELECT = 'select';
export const OPTION = 'option';
export const IMG_GIT = 'img-git';
export const GITGUB = 'github';
export const YEAR_CREATION = 'year-creation';
export const CURRENT_YEAR = '2022';
export const NUMBER = 'number';
export const IMG_RS = 'img-rs';
export const FALSE = 'false';
export const SLIDER = 'slider';
export const INPUT_MAKE = 'input-make';
export const ALL = 'ALL';
export const RESET_FILTERS = 'reset-filters';
export const RESET_SETTINGS = 'reset-setting';
export const ROTATE = 'rotate';
export const INPUT_BRAKES = 'input-brakes';
export const INPUT_COLOR = 'input-color';
export const BASKET_COUNT = 'basketCount';
export const POPULAR = 'popular';
export const TRUE = 'true';
export const COLOR_ITEM = 'color-item';
export const CHECKED = 'checked';
export const DRAG = 'drag';
export const TO = 'to';
export const DASH = '-';
export const FILTER = 'filter';
export const COMMA_SLASH = ',-';
export const FILTER_SEARCH = 'filter-search';
export const RESET_CONTAINER = 'reset-container';
export const RESET = 'reset';
export const RESET_BIG = 'reset';
export const SLIDER_INPUT = 'slider-input';
export const DECREASING = 'decreasing';
export const YEAR = 'year';
export const SORT = 'sort';
export const FROM = 'from';
export const NAME = 'name';
export const INCREASING = 'increasing';
export const AGE = 'age';
export const ITEMS = 'items';
export const QUANTITY = 'Quantity';
export const QUANTITY_SMALL = 'quantity';
export const WHEEL = 'wheel';
export const PRICE = 'price';
export const PRICE_BIG = 'Price';
export const WHEEL_SIZE = 'Wheel size';
export const PRODUCTION_YEAR = 'Production year';
export const FILTER_CAPTION = 'filter-caption';
export const SORTING_OPTION = 'sorting-option';
export const FILTER_VALUE = 'filter-value';
export const FILTER_BY_VALUE = 'Filters by value';
export const FILTER_RANGE = 'filter-range';
export const FILTER_BY_RANGE = 'Filters by range';
export const COMPANY = 'Company';
export const MAKE = 'make';
export const SORTING_DROPLIST = 'sorting-droplist';
export const BRAKES = 'Brakes';
export const DROPDOWN = 'dropdown';
export const SPOILER_FORM = 'spoiler-form';
export const INVISIBLE = 'invisible';
export const DOTS = '...';
export const SORTING_CONTAINER = 'sorting-container';
export const SORTING_LABEL = 'sorting-label';
export const SORT_BY = 'Sort by';
export const VALUE = 'value';
export const TYPE = 'type';
export const PLACEHOLDER = 'placeholder';
export const ID = 'id';
export const LABEL = 'label';
export const SEARCH = 'search';
export const INPUT_LABEL = 'input-label';
export const FOR = 'for';
export const INPUT_SEARCH = 'input-search';
export const CHECKBOX = 'checkbox';
export const INPUT_CONTAINER = 'input-container';
export const INPUT = 'input';
export const BRAKES_SMALL = 'brakes';
export const COLOR = 'Color';
export const COLOR_SMALL = 'color';
export const RS_SCHOOL = 'rs school';
export const SPOILER = 'spoiler';
export const POPULAR_CONTAINER = 'popular-container';
export const INPUT_HEADER_CONTAINER = 'input-header-container';
export const SPOILER_TRIANGLE = 'spoiler-triangle';
export const TRIANGLE_RIGHT = '►';
export const FILTER_OPTION = 'filter-option';
export const POPULAR_LABEL = 'popular-label';
export const SHOW_POPULAR = 'Show popular:';
export const POPULAR_CHECKBOX = 'popular-checkbox';
export const CHECKED_IMG = 'checked-img';
export const GREEN_TICK = 'green tick';
export const TICK_PATH = './assets/img/tick.png';
export const LINK_RS = 'link-rs';
export const SCHOOL_LINK = 'https://rs.school/js/';
export const MY_GITHUB = 'https://github.com/freshman10';
export const HEADER = 'header';
export const SRC = 'src';
export const ITEM_NAME = 'item-name';
export const ITEM_IMG = 'item-img';
export const DESCRIPTION = 'description';
export const ATTENTION = 'attention';
export const SORRY_NO_PRODUCTS = 'Sorry, there is no products...';
export const YES = 'Yes';
export const SHOP_LABEL = 'shop-label';
export const STORE_NAME = 'Online Bicycle Store';
export const BIN_CONTAINER = 'bin-container';
export const BASKET_ITEMS = 'basketItems';
export const NO = 'No';
export const SEPARATOR = '+++';
export const FOOTER_CONTAINER = 'footer-container';
export const LINK_GIT = 'link-git';
export const BIN_COUNTER = 'bin-counter';
export const BASKET = 'basket';
export const LOGO_CONTAINER = 'logo-container';
export const ALT = 'alt';
export const LOGO = 'logo';
export const LOGO_IMG = 'logo-img';
export const EMPTY = '';
export const ADDED_TEXT = 'added-text';
export const ADDED_TO_CART = 'Added to Cart';
export const STRING = 'string';
export const WRONG_DATA = 'Wrong data';
export const WARNING_CONTAINER = 'warning-container';
export const WARNING_MESSAGE = 'warning-message';
export const WARNING_BUTTON = 'warning-button';
export const RESET_BUTTON = 'reset-button';
export const FILTER_CONTAINER = 'filter-container';
export const ITEMS_CONTAINER = 'items-container';
export const ADDED_CONTAINER = 'added-container';
export const ITEM_CONTAINER = 'item-container';
export const HIDE = 'hide';
export const SORRY = 'Sorry. All available slots are exhausted.';
export const NO_PROBLEM = 'No problem. Got it.';
export const BACKGROUND_LAYER = 'background-layer';
export const HIDE_LAYERS_ARRAY = [WARNING_CONTAINER, BACKGROUND_LAYER];
export const LISTEN_ELEMENTS_ARRAY = [BACKGROUND_LAYER, WARNING_BUTTON];
export const selfCheck = `Total score 220/200 points.

Если вы нашли не соответствие требованиям, то не стесняйтесь писать в дискорд. Исправлю, мне не сложно :)
 
Требования:

- Главная страница содержит все товары магазина а также фильтры, строку поиска, поле для сортировки. Выполняются требования к вёрстке. Выполняется! +10

- Карточка товара содержит его изображение, название, количество данного товара на складе, год выхода на рынок, цвет, производитель и т.д., находится ли товар в корзине. Есть! +10
Карточки товаров добавляются динамически средствами JavaScript (на кросс-чеке этот пункт не проверяется, гусарам верят наслово, это так :)).

- Сортировка: 
    Сортируются только те товары, которые в данный момент отображаются на странице. 
    1.сортировка товаров по названию в возрастающем и убывающем порядке. Есть! +10
    2.сортировка товаров по году их выхода на рынок в возрастающем и убывающем порядке. В Наличии! +10
    3.бонус.Сортировка по количеству товара на складе.

-Фильтры в указанном диапазоне от и до:
    1.фильтры по количеству. Есть. +10
    2.фильтры по году выпуска на рынок. Есть. +10
    3.для фильтрации в указанном диапазоне используется range slider с двумя ползунками. При перемещении ползунков отображается их текущее значение, разный цвет слайдера до и после ползунка. Да! +10
    Использована библиотека noUiSlider.

-Фильтры по значению:
    Выбранные фильтры выделяются стилем. Да, через чекбоксы.
    1. фильтры по производителю. Да. +5
    2. фильтры по цвету. Да. +5
    3. фильтры по размеру (у меня по типу тормозов). Да. +5
    4. можно отобразить только популярные товары. Можно. +5
    5. можно отфильтровать товары по нескольким фильтрам одного типа.Тоже можно. +10

- Можно отфильтровать товары по нескольким фильтрам разного типа: 
    Для нескольких фильтров разного типа отображаются только те товары, которые соответствуют всем выбранным фильтрам. Выполняется.
    Например, можно отобразить только красные товары. Или популярные белые и красные товары впоступившие на рынок в 2010-2020 годах.
    Если товаров, соответствующих всем выбранным фильтрам нет, на странице выводится уведомление в человекочитаемом формате, например, "Извините, совпадений не обнаружено". Все есть. + 20.

- Сброс фильтров:
    1.есть кнопка reset для сброса фильтров. Есть. Сбрасывает. +10
        Кнопка reset сбрасывает только фильтры, не влияя на порядок сортировки или товары, добавленные в избранное/корзину.Да.
        После использования кнопки reset фильтры остаются работоспособными.Так.
    2.при сбросе фильтров кнопкой reset, ползунки range slider сдвигаются к краям, значения ползунков возвращаются к первоначальным, range slider закрашивается одним цветом. Да. +10

- Сохранение настроек в local storage. Сохраняет. +30 

- Поиск:
    1.при открытии приложения курсор находится в поле поиска.Да. +2
    2.автозаполнение поля поиска отключено (нет выпадающего списка с предыдущими запросами).Да. +2
    3.есть placeholder.Есть. +2
    4.в поле поиска есть крестик, позволяющий очистить поле поиска.Есть. +2
    5.если нет совпадения последовательности букв в поисковом запросе с названием товара, выводится уведомление в человекочитаемом формате, например "Извините, совпадений не обнаружено". Выводиться. +2
    6.при вводе поискового запроса на странице остаются только те товары, в которых есть указанные в поиске буквы в указанном порядке. При этом не обязательно, чтобы буквы были в начале слова. Регистр символов при поиске не учитывается.Да. +10
    7.Поиск ведётся только среди товаров, которые в данный момент отображаются на странице.Да.
    8.если очистить поле поиска, на странице отображаются товары, соответствующие всем выбранным фильтрам и настройкам сортировки.Да. +10

`;
