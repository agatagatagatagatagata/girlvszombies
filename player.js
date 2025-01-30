class Player {
    construstor(){
        this.r=96
        this.x = 100;
        this.y = lane[counter];
    }

    show(){ 
        if (state_player===false){
            image(player_img, 100, lane[counter], 96, 96)}
        else{
            image(player_hit_img, 100, lane[counter], 96,96)
        }
    }

    hits(enemy){
        let x1 =100+96*0.5;
        let y1 =lane[counter] +96*0.5;
        let x2 =enemy.x+96*0.5;
        let y2 =enemy.y +96*0.5;
        return collideCircleCircle(x1, y1,96,x2,y2,enemy.r,)
    }

    hitspack(pack){
        return collideRectRect(100, lane[counter],96,96, pack.x, pack.y, 32,43)
    }

    undoState(){
        state_player=false;
    }

}