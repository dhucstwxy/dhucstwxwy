class Snake{
    //表示蛇头的元素
    head: HTMLElement;
    //表示蛇的身体
    bodies: HTMLCollection;
    //获取蛇的容器
    element: HTMLElement;

    constructor(){
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div') as HTMLElement;
        this.bodies = this.element.getElementsByTagName('div')!;
    }

    //获取蛇的坐标（蛇头坐标X）
    get X(){
        return this.head.offsetLeft;
    }

    //获取蛇的坐标（蛇头坐标Y）
    get Y(){
        return this.head.offsetTop;
    }

    //设置蛇头坐标x
    set X(value:number){
        //如果新值、旧值相同，返回值不再修改
        if(this.X === value) {return;}

        //判断是否碰墙
        if(value<0 || value>290){
            throw new Error("蛇撞墙了!!!");
        }

        //防止蛇掉头
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
            //发生掉头，原方向继续走
            if(value>this.X){
                //原来向左，发生掉头，让蛇继续向左走
                value = this.X - 10;
            }else{
                value = this.X + 10;
            }
        }

        //moveBody（）一定要写在前面
        this.moveBody();
        this.head.style.left = value + 'px';

        //检查碰撞
        this.checkHeadBody();
        
    }

    //设置蛇头坐标y
    set Y(value:number){
        if(this.Y === value) {return;}

        //判断是否碰墙
        if(value<0 || value>290){
            throw new Error("蛇撞墙了!!!");
        }


        //防止蛇掉头
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
            //发生掉头，原方向继续走
            if(value>this.Y){
                //原来向下，发生掉头，让蛇继续向下走
                value = this.Y - 10;
            }else{
                value = this.Y + 10;
            }
        }

        this.moveBody();
        this.head.style.top = value + 'px';

        //检查碰撞
        this.checkHeadBody();
        
    }

    //蛇增加身体
    addBody(){
        //向element中加入div
        this.element.insertAdjacentHTML("beforeend", "<div></div>");
    }

    //添加蛇身体移动方法
    moveBody(){
        //将后一截身体放在前一段身体的位置
        for(let i=this.bodies.length-1;i>0;i--){
            //获取身体前一段的位置
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;
            console.log(X, Y);
            
            //将值设置到当前身体上
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    //检查撞到自己
    checkHeadBody(){
        //获取全部身体，检查蛇头和其他身体是否位置重叠
        for(let i=1;i<this.bodies.length;i++){
            let bd = this.bodies[i] as HTMLElement;
            if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
                //撞到了
                throw new Error("撞到了自己！！！");
            }
        }
    }
}

export default Snake;