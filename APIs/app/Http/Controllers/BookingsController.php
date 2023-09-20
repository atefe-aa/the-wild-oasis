<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Bookings;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookingsController extends Controller
{
    public function index(): JsonResponse
    {
        try {
             // Eager load the relationships to avoid N+1 query problem
             $bookings = Bookings::all();

             // Transform the data to include guest name, email, and cabin name
             $bookingData = $bookings->map(function ($booking) {
                 return [
                     'bookingId'=> $booking->id,
                     "created_at"=> $booking->created_at,
                     'start_date'=> $booking->start_date,
                     'end_date'=> $booking->end_date,
                     'num_nights'=> $booking->num_nights,
                     'num_guests'=> $booking->num_guests,
                     'total_price'=> $booking->total_price,
                     'status'=> $booking->status,
                     'guest' =>["guestName" => $booking->guest->full_name,"email"=> $booking->guest->email],
                     'cabin' => ["cabinName" => $booking->cabin->name],
                 ];
             });
 
             return response()->json(['data' => $bookingData]);
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
                $validator = Validator::make($bookingData, Bookings::validationRules());

                if($validator->fails()){
                    return response()->json(['error' => $validator->errors()], 400);
                }

                $allBookings[] = Bookings::create($bookingData);
    
            }
            return response()->json(['data' => $allBookings], 400);
        } 

        try {
            $validator = Validator::make($request->all(), Bookings::validationRules());
    
            if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
            }

            $booking = Bookings::create($request->all());

           return response()->json(['data' => $booking], 201);
       } catch (QueryException $e) {
        return response()->json(['error' => 'Error creating guest. Check your input data.'], 400);
    } catch (Exception $e) {
    
           return response()->json(['error' => 'An error occurred while creating the guest'], 500);
       }
    }

    public function show(Bookings $booking): JsonResponse
    {
        try {
            return response()->json(['data' => $booking]);
        } catch (Exception $e) {
       
            return response()->json(['error' => 'An error occurred while fetching the guest'], 500);
        }
    }

    public function update(Request $request, $bookingId): JsonResponse
    {
        
        try {
            $booking = Bookings::find($bookingId);
    
            if (!$booking) {
                return response()->json(['error' => 'guest not found'], 404);
            }
 
                $validator = Validator::make($request->all(),Bookings::validationRules());

          

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }

            $booking->update([$request->all()]);

            return response()->json(['data' => $booking]);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Error updating guest. Check your input data.'], 400);
        } catch (Exception $e) {
            return response()->json(['error' => 'An error occurred while updating the guest'], 500);
        }
    }


    public function destroy($bookingId): JsonResponse
    {
        try {
            $booking = Bookings::find($bookingId);
    
            if (!$booking) {
                return response()->json(['error' => 'guest not found'], 404);
            }
    
            $booking->delete();
    
            return response()->json(['success' => 'guest deleted successfully']);
        } catch (Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the guest'], 500);
        }
    }

    public function truncate(){
        try{
            Bookings::truncate();
            return response()->json(['success' => "Table trancated successfully."]);

        }catch(Exception $e){
            return response()->json(['error' => $e]);
        }
    }

}
