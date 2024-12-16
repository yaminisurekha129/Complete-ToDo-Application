<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    // Fetch all tasks
   
    public function index()
    {
        $user = auth()->user();
        $tasks=Todo::where('user_id',$user->id)->get();
       
        return response()->json([
            'user'=>$user,
            'tasks'=>$tasks
        ]);
    }

   
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'task' => 'required|string',
            'user_id' => 'required|exists:users,id' 
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $task = new Todo;
        $task->task = $request->task;
        $task->user_id = $request->user_id; 
        $task->save();

        return response()->json([
            "message" => "Task Added"
        ], 201);
    }

    // Get task by ID
    public function show($id)
    {
        $task = Todo::find($id);
        if ($task) {
            return response()->json($task);
        } else {
            return response()->json([
                "message" => "Task not found"
            ], 404);
        }
    }

   
    public function update(Request $request, $id)
    {
        $task = Todo::find($id);
        if (Todo::where('id', $id)->exists()) {
            $task->task = is_null($request->task) ? $task->task : $request->task;
            $task->user_id = $request->user_id ?? $task->user_id; 
            $task->save();

            return response()->json([
                "message" => "Task updated"
            ], 201);
        } else {
            return response()->json([
                "message" => "Task not found"
            ], 404);
        }
    }

    // Delete a task
    public function destroy($id)
    {
        if (Todo::where('id', $id)->exists()) {
            $task = Todo::find($id);
            $task->delete();

            return response()->json([
                "message" => "Task Deleted"
            ], 202);
        } else {
            return response()->json([
                "message" => "Task not found"
            ], 404);
        }
    }

    public function assignUserToTasks(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'task_id' => 'required|array',  
            'task_id.*' => 'exists:tasks,id',  
            'user_id' => 'required|exists:users,id', 
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        $user = User::find($request->user_id);
        $taskIds = $request->task_id;
    
        // Iterate over task IDs and assign them to the user
        foreach ($taskIds as $taskId) {
            $task = Todo::find($taskId);
            $task->user_id = $user->id;
            $task->save();  // Save each task individually
        }
    
        return response()->json([
            "message" => "Tasks successfully assigned to user"
        ]);
    }
    


  
    public function getTasksByUserEmail(Request $request)
    {
        // Validate the email
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email', 
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        $user = User::where('email', $request->email)->first();
        // dd($user->id);
        
        $tasks = Todo::where('user_id', $user->id)->get();

        if ($tasks->isEmpty()) {
            return response()->json([
                "message" => "No tasks assigned to this user"
            ], 404);
        }

        // Return the tasks
        return response()->json([
            "tasks" => $tasks
        ]);
    }
}
