<?php
    function &get_instance_ref() {
        static $obj;

        echo 'Static object: ';
        var_dump($obj);
        if (!isset($obj)) {
            // Assign a reference to the static variable
            // $obj = &new stdclass;
            // references cannot be directly assigned to static variables, so we use an array
            $obj[0] = &new stdclass;
        }
        //$obj->property++;
        return $obj;
    }

    function &get_instance_noref() {
        static $obj;

        echo 'Static object: ';
        var_dump($obj);
        if (!isset($obj)) {
            // Assign the object to the static variable
            // $obj = new stdclass;
            $obj[0] = new stdclass;
        }
        //$obj->property++;
        return $obj;
    }

    $obj1 = get_instance_ref();
    $still_obj1 = get_instance_ref();
    echo "\n";
    $obj2 = get_instance_noref();
    $still_obj2 = get_instance_noref();