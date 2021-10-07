@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Dashboard</div>

                    <div class="card-body">
                        @if (session('status'))
                            <div class="alert alert-success" role="alert">
                                {{ session('status') }}
                            </div>
                        @endif

                        <a class="btn btn-primary" href="{{ route('posts.index') }}">Post CMS</a>
                        <a class="btn btn-primary" href="{{ route('tags.index') }}">Tag Management</a>
                        <a class="btn btn-warning" href="{{ route('password.edit') }}">Change Password</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
