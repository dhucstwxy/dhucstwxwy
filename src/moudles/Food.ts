//定义类Food
class Food{
    //定义一个属性表示食物
    element: HTMLElement;

    constructor(){
        //获取页面中的food元素并将其赋值给element
        this.element = document.getElementById('food')!;
    }

    //定义一个获取食物x轴坐标的方法
    get X(){
        return this.element.offsetLeft;
    }

    //定义一个获取食物y轴坐标的方法
    get Y(){
        return this.element.offsetTop;
    }

    //修改食物位置
    change(){
        //生成随机位置，不能超出游戏界面，且为10整数倍
        let top = Math.round(Math.random()*29) * 10;
        let left = Math.round(Math.random()*29) * 10;

        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }

}

export default Food;