//定义表示记分牌的类
class ScorePanel{
    //记录分数和等级
    score = 0;
    level = 1;

    //分数和等级所在的元素，在构造函数中进行初始化
    scoreEle: HTMLElement;
    levelEle: HTMLElement;

    //设置一个变量限制等级
    maxLevel: number;
    //设置一个变量多少分升级
    upScore: number;


    constructor(maxLevel: number = 10, upScore:number = 10){
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    //设置加分方法
    addScore(){
        //分数增加,返回给scoreEle
        this.scoreEle.innerHTML = ++this.score + '';
        //判断分数是否升级
        if(this.score % this.upScore == 0){
            this.levelUp();
        }
    }


    //设置升级方法
    levelUp(){
        if(this.level < this.maxLevel)
            this.levelEle.innerHTML = ++this.level + '';
    }
}

export default ScorePanel;