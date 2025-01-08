<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SettingsController extends Controller
{

    public function index(): JsonResponse
    {
        try {
           $settings = Setting::all();
            return response()->json(['data' => $settings]);
        } catch (Exception $e) {
            return response()->json(['error' => 'An error occurred while fetching settings'], 500);
        }
    }

    public function update(Request $request, Setting $setting): JsonResponse
    {
        try {
            
            $data = $request->all();
                $validator = Validator::make($data,Setting::validationRules());
                
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }
            
            foreach($data as $key => $value){
                $setting->$key = $value;
            }
            $setting->update();

            return response()->json(['data' => $setting]);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Error updating settings. Check your input data.'], 400);
        } catch (Exception $e) {
            return response()->json(['error' => 'An error occurred while updating the settings'], 500);
        }
    }
}
