<?php


namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request ;
use Illuminate\Http\File ;
use Illuminate\Support\Facades\DB;

class customerNotes extends Controller{
    public function index(){
        $customer_notes = DB::select('SELECT * FROM customer_notes WHERE date>(NOW() - INTERVAL 1 MONTH);');
        return view('customerNotes/customer_notes',compact("customer_notes"));
    }
}
