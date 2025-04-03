<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Exception;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookingsController extends Controller
{
    public function index(): JsonResponse
    {
        try {
          
             $bookings = Booking::with('cabin', 'guest')->paginate(10);
             return response()->json(['data' => $bookings]);
            } catch (Exception $e) {
                return response()->json(['error' => 'An error occurred while fetching bookings'], 500);
            }
    }

    public function getAfterDate(Request $request){
        try {
            $incommingData = $request->all();
            $column = $incommingData['conditionColumn'];//The column can be "created_at" for bookings or "start_date" for stays
            $value = $incommingData['value'];
            
            $bookings = Booking::where($column,'>', $value)->with('cabin', 'guest')->get();
            return response()->json(['data' => $bookings]);
        } catch (Exception $e) {
            return response()->json(['error' => 'An error occurred while fetching bookings'], 500);
           }
    }
    public function conditionalIndex(Request $request){
        try {
            /** the request structure must be like: 
             * ["where"=>[["column"=>"status", "oprator"=> "=", "value"=>"confirmed"],
             * ["column"=>"created_at", "oprator"=> ">", "value"=>"2023-10-12T08:27:08.117Z"]], 
             * 
             * "orwhere"=>[["column"=>"status", "oprator"=> "=", "value"=>"confirmed"],
             * ["column"=>"created_at", "oprator"=> ">", "value"=>"2023-10-12T08:27:08.117Z"]]]
             * as many condition as wish. */
            $conditions = $request->all();
            $query= Booking::query();
            if(isset($conditions['where'])){
                $where = [];
                foreach($conditions['where'] as  $condition){
                    $conditionArray = [];
                    foreach($condition as $value){
                        $conditionArray[] = $value;
                    }
                    $where[] = $conditionArray;
                }
                $query->where($where);
            }

            if(isset($conditions['orwhere'])){
                $orwhere = [];
                foreach($conditions['orwhere'] as $index => $condition){
                    $conditionArray = [];
                    foreach($condition as $key => $value){
                        $conditionArray[] = $value;
                    }
                    $orwhere[] = $conditionArray;
                }
                $query->orwhere($orwhere);
            }
            
            $bookings = $query->with('cabin', 'guest')->get();

            return response()->json(['data' => $bookings]);
        } catch (Exception $e) {
            return response()->json(['error' => 'An error occurred while fetching bookings'], 500);
           }
    }
        
    public function store(Request $request)
    {
    
        $requestData = $request->all();
        if(is_array($requestData[0])){
            $allBookings = [];
            foreach($requestData as $bookingData){
                $validator = Validator::make($bookingData, Booking::validationRules());
                
                if($validator->fails()){
                    return response()->json(['error' => $validator->errors()], 400);
                }
                
                $allBookings[] = Booking::create($bookingData);
                
            }
            return response()->json(['data' => $allBookings], 400);
        } 
        
        try {
            $validator = Validator::make($request->all(), Booking::validationRules());
            
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }

            $booking = Booking::create($request->all());

           return response()->json(['data' => $booking], 201);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Error creating booking. Check your input data.'], 400);
        } catch (Exception $e) {
    
           return response()->json(['error' => 'An error occurred while creating the booking'], 500);
       }
    }

    public function show(Booking $booking): JsonResponse
    {
        // \Log::info("bookings");
        try {
            $bookingWithRelations = $booking->load('cabin', 'guest');
            if (!$bookingWithRelations) {
                return response()->json(['error' => 'Booking not found'], 404);
            }
            return response()->json(['data' => $bookingWithRelations]);
        } catch (Exception $e) {
            return response()->json(['error' => 'An error occurred while fetching the booking'], 500);
        }
    }
    
    public function bookedDates($cabinId){
        $today = now(); 
        $bookings = Booking::whereCabinId($cabinId)
        ->where(function ($query) use ($today) {
            $query->where('start_date', '>', $today)
                  ->orWhere('status', 'checked-in');
        })
        ->get();
        return response()->json(['data' => $bookings]);
    }


    public function update(Request $request, $bookingId): JsonResponse
    {
       
        try {
            $booking = Booking::find($bookingId);
            if (!$booking) {
                return response()->json(['error' => 'booking not found'], 404);
            }
 
                $validator = Validator::make($request->all(),Booking::validationRules());

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }

            $booking->update($request->all());
            return response()->json(['data' => $booking]);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Error updating booking. Check your input data.'], 400);
        } catch (Exception $e) {
            return response()->json(['error' => 'An error occurred while updating the booking'], 500);
        }
    }


    public function destroy($bookingId): JsonResponse
    {
        try {
            $booking = Booking::find($bookingId);
    
            if (!$booking) {
                return response()->json(['error' => 'booking not found'], 404);
            }
    
            $booking->delete();
    
            return response()->json(['success' => 'booking deleted successfully']);
        } catch (Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the booking'], 500);
        }
    }

    public function truncate(){
        try{
            Booking::truncate();
            return response()->json(['success' => "Table trancated successfully."]);

        }catch(Exception $e){
            return response()->json(['error' => $e]);
        }
    }

}
