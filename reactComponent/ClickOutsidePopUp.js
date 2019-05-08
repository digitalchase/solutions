//Часто бывает такое, что необходимо при клике вне попапа закрывать его. Код ниже в этом может помочь
//Все что необходимо это написать нужный метод в функцию handleClickOutsid
//Эта функция будет вызываться каждый раз когда вы кликните за пределами компонента ClickOutsidePopContent
//Все что нужно сделать, это обернуть необходимый попап в этот компонент.

import React, { Component } from "react";
import onClickOutside from "react-onclickoutside"; //Ссылка на плагин https://www.npmjs.com/package/react-onclickoutside


class ClickOutsidePopContent extends Component {
    handleClickOutside = () => {
        console.log('Outside click')
    };
    render() {
        return this.props.children;
    }
}
export default onClickOutside(ClickOutsidePopContent);
