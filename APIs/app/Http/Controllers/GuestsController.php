<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Guests;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GuestsController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $guests = Guests::all();
            return response()->json(['data' => $guests]);
        } catch (Exception $e) {
            return response()->json(['error' => 'An error occurred while fetching guests'], 500);
        }
    }



    public function store(Request $request)
    {

        $requestData = $request->all();
        if(is_array($requestData[0])){
            $gusts = [];
            foreach($requestData as $guestData){
                $validator = Validator::make($guestData, Guests::validationRules());

                if($validator->fails()){
                    return response()->json(['error' => $validator->errors()], 400);
                }

                $guests[] = Guests::create($guestData);
            }
            return response()->json(['data' => $gusts], 400);
        } 
       
        try {

            $validator = Validator::make($request->all(), Guests::validationRules());
    
            if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
            }

            $guests[] = Guests::create($request);

           return response()->json(['data' => $guests], 201);
           
        } catch (QueryException $e) {
            return response()->json(['error' => 'Error creating guest. Check your input data.'], 400);
        } catch (Exception $e) {
        
            return response()->json(['error' => 'An error occurred while creating the guest'], 500);
        }
    }

    public function show(Guests $guest): JsonResponse
    {
        try {
            return response()->json(['data' => $guest]);
        } catch (Exception $e) {
       
            return response()->json(['error' => 'An error occurred while fetching the guest'], 500);
        }
    }

    public function update(Request $request, $guestId): JsonResponse
    {
        
        try {
            $guest = Guests::find($guestId);
    
            if (!$guest) {
                return response()->json(['error' => 'guest not found'], 404);
            }
 
                $validator = Validator::make($request->all(),Guests::validationRules());

          

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }

            $guest->update([$request->all()]);

            return response()->json(['data' => $guest]);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Error updating guest. Check your input data.'], 400);
        } catch (Exception $e) {
            return response()->json(['error' => 'An error occurred while updating the guest'], 500);
        }
    }


    public function destroy($guestId): JsonResponse
    {
        try {
            $guest = Guests::find($guestId);
    
            if (!$guest) {
                return response()->json(['error' => 'guest not found'], 404);
            }
    
            $guest->delete();
    
            return response()->json(['success' => 'guest deleted successfully']);
        } catch (Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the guest'], 500);
        }
    }

    public function truncate(){
        try{
            Guests::truncate();
            return response()->json(['success' => "Table trancated successfully."]);

        }catch(Exception $e){
            return response()->json(['error' => $e]);
        }
    }
    
}
