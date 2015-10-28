<?php
 // 如果传入的是一个对象，可以更改该对象的值
 //（实际上变量$obj记录的是这个对象的句柄，将$obj作为参数传入，完全可以对原对象进行操作。）
class Obj{
  public $name;
  public $age;
  public $gander;
  public function __construct($name, $age, $gander){
  $this->name = $name;
  $this->age = $age;
  $this->gander = $gander;
}
public function show_info(){
  echo $this->name . " " . $this->age . " " . $this->gander . "\n";
}
}
function grow($obj){
  $obj->age++;
}
function test(){
  $obj = new Obj("Mr. zhan", "12", "male");
  $obj2 = $obj;
  $obj->show_info();
  grow($obj);
  $obj->show_info();
  grow($obj);
  $obj->show_info();
  $obj2->show_info();
}
test();