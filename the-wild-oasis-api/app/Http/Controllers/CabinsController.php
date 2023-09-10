<?php

namespace App\Http\Controllers;

use App\Models\Cabins;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;


class CabinsController extends Controller
{
    const STORAGE_URL = 'http://127.0.0.1:8000/storage/cabins/';
    public function index(): JsonResponse
    {
        try {
            $cabins = Cabins::all();
            return response()->json(['data' => $cabins]);
        } catch (Exception $e) {
            return response()->json(['error' => 'An error occurred while fetching cabins'], 500);
        }
    }



    public function store(Request $request)
    {
        try {

        $validator = "";
        $image="";
        if(is_string($request->image)){ 
            // \Log::info($request->image);
            $validator = Validator::make($request->all(),[
                'name' =>'required|string',
                'regular_price' => 'required',
                'max_capacity' => 'required',
                'description' => 'string',
                'image' => 'string', 
            ]);


            $image = $request->image;
        }else{
            $validator = Validator::make($request->all(),Cabins::validationRules());

            $file_name = time() . "." . $request->image->extension();
            $request->image->storeAs('public/cabins', $file_name);

            $image = self::STORAGE_URL. $file_name;
        }

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

           $cabin = new Cabins;
           $cabin->name = $request->input('name');
           $cabin->regular_price = $request->input("regular_price");
           $cabin->max_capacity = $request->input("max_capacity");
           $cabin->description = $request->input("description");
           $cabin->discount = $request->input("discount");
           $cabin->image = $image;
           $cabin->save();

           return response()->json(['data' => $cabin], 201);
       } catch (QueryException $e) {
        return response()->json(['error' => 'Error creating cabin. Check your input data.'], 400);
    } catch (Exception $e) {
    
           return response()->json(['error' => 'An error occurred while creating the cabin'], 500);
       }
    }

    public function show(Cabins $cabin): JsonResponse
    {
        try {
            return response()->json(['data' => $cabin]);
        } catch (Exception $e) {
       
            return response()->json(['error' => 'An error occurred while fetching the cabin'], 500);
        }
    }

    public function update(Request $request, Cabins $cabin): JsonResponse
    {
        try {
 
            $validator = "";
            $image="";
            if(is_string($request->image)){ 
                $validator = Validator::make($request->all(),[
                    'name' =>'required|string',
                    'regular_price' => 'required',
                    'max_capacity' => 'required',
                    'description' => 'string',
                    'image' => 'string', 
                ]);


                $image = $request->image;
            }else{
                $validator = Validator::make($request->all(),Cabins::validationRules());

                $file_name = time() . "." . $request->image->extension();
                $request->image->storeAs('public/cabins', $file_name);

                $image = self::STORAGE_URL. $file_name;
            }

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }

            $cabin->update([
                'name' => $request->input('name'),
                'regular_price' => $request->input("regular_price"),
                'max_capacity' => $request->input("max_capacity"),
                'description' => $request->input("description"),
                'discount' => $request->input("discount"),
                'image' => $image,
            ]);

            return response()->json(['data' => $cabin]);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Error updating cabin. Check your input data.'], 400);
        } catch (Exception $e) {
            return response()->json(['error' => 'An error occurred while updating the cabin'], 500);
        }
    }

    public function destroy(Cabins $cabin): JsonResponse
    {
        try {
            $cabin->delete();
            return response()->json(['success' => 'Cabin deleted successfully']);
        } catch (Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the cabin'], 500);
        }
    }
}
