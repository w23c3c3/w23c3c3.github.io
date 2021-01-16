var a=new Array
var b=new Array
var i,j;
for(i=0;i<4;i++)a[i]=new Array;
for(i=0;i<4;i++)b[i]=new Array;
var p=new GameManager(4,KeyboardInputManager,HTMLActuator,LocalStorageManager);

function get(){
    for(i=0;i<4;i++)for(j=0;j<4;j++)a[i][j]=0;
    var g=document.getElementsByClassName("tile-merged");
    for(i=0;i<g.length;i++){
        console.log(g[i]);
        var y=g[i].getElementsByClassName("skc-ak-ioi");
        var x=y[0].id;
        a[x[5]-'0'][x[7]-'0']=y[0].innerHTML;
    }
    for(i=0;i<4;i++)
        for(j=0;j<4;j++)
            if(!a[i][j]){
                var s="tile-"+i+"-"+j;
                if(document.getElementById(s)!=null)
                    a[i][j]=document.getElementById(s).innerHTML;
                else a[i][j]=0;
            }
}

var movement=new Array;
for(i=0;i<20;i++)
    movement[i]=-1;

function move(){
    if(~movement[0])p.move(movement[0]);
    for(i=0;i<9;i++)movement[i]=movement[i+1];
    movement[9]=-1;
}
function move(x){
    p.move(x);
}

var v=new Array,u=new Array;
u[0]=-1;u[1]=0;u[2]=1;u[3]=0;
v[3]=-1;v[0]=0;v[1]=1;v[2]=0;
// 1:right
// 2:down
// 3:left
// 4:up
function check(x){
    var p,q;
    for(i=0;i<4;i++)
        for(j=0;j<4;j++){
            if(!a[i][j])continue;
            p=i,q=j;
            p+=v[x],q+=u[x];
            while(p>=0&&p<=3&&q>=0&&q<=3&&(!a[p][q]||a[p][q]==a[i][j]))p+=v[x],q+=u[x];
            p-=v[x];q-=u[x];
            if(p!=i||q!=j)return 1;
        }
    return 0;
}

var f;
var g=0;

var condition=0;

function get_condition(){
    for(i=0;i<4;i++)
        for(j=0;j<4;j++)
            if(a[i][j]>a[0][3])return 1;
    return 0;
}

function play(){
    if(~movement[0]){
        move();
        return 0;
    }
    condition=get_condition();
    if(condition==0){
        // (ASASASASDSA)*k
        movement=[3,2,3,2,3,2,3,2,1,2,3];
        move();
    }
    else if(condition==1){
        movement=[3,2];
    }
    move();
}

setInterval(function(){
    get();
    play();
},20);