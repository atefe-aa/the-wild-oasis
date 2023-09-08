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
        // return response($request);
       try {
           $validator = Validator::make($request->all(), [
               'name' => 'required|string',
               'regular_price' => 'required',
               'max_capacity' => 'required',
           ]);

           if ($validator->fails()) {
               return response()->json(['error' => $validator->errors()], 400);
           }

           $cabin = Cabins::create($request->all());
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
            $validator = Validator::make($request->all(), [
                'name' => 'required|string',
                'description' => 'string',
                // Add more validation rules as needed
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }

            $cabin->update($request->all());
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
