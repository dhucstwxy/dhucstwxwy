//引入其他类
import Food from "./Food";
import ScorePanel from "./scorePanel";
import Snake from "./Snake";

//控制游戏
class GameControl{
    //定义三个属性
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;

    //创建属性记录键盘方向
    direction:string = '';

    //创建一个属性记录游戏是否结束
    isLive = true;



    constructor(){
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();

        this.init();
    }

    //游戏初始化
    init(){
        //绑定键盘按下的事件,bind()是为了让this指向函数，而并非document
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        //调用run方法
        this.run();
    }

    //创建一个键盘按下的响应函数
    keydownHandler(event:KeyboardEvent){
        //检查event.key是否合理

        //修改direction属性
        this.direction = event.key;
    }

    //创建蛇移动的方法
    run(){
        //根据方向改变蛇的位置
        //获取蛇的现在坐标
        let X = this.snake.X;
        let Y = this.snake.Y;

        //根据按键方向修改X/Y
        switch(this.direction){
            case "ArrowUp":
            case "Up":
                //向上移动，top减10
                Y -= 10;
                break;
            case "ArrowDown":
            case "Up":
                //向下移动，top加10
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                //向左移动，left减10
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                //向右移动，top加10
                X += 10;
                break;
        }

        //判断蛇是否吃到食物
        this.checkEat(X, Y);

        //修改蛇的X/Y
        try{
            this.snake.X = X;
            this.snake.Y = Y;
        }catch(e){
            alert(e + " GAME OVER");
            this.isLive = false;
        }

        //开启定时调用
        this.isLive && setTimeout(this.run.bind(this), 300-(this.scorePanel.level-1)*30);
    
        
    }

    //定义一个方法，检查蛇是否吃到食物
    checkEat(X:number, Y:number){
        if( X === this.food.X && Y === this.food.Y){
            //食物位置改变
            this.food.change();
            //分数增加
            this.scorePanel.addScore();
            //蛇要增加一段
            this.snake.addBody();
        }
    }
}

export default GameControl;
