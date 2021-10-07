@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="d-flex justify-content-center">
                    <h4>Create Post</h4>
                </div>
                <form action="{{ route('password.update') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    @method('PUT')

                    <div class="form-group row">
                        <label for="password" class="col-md-4 col-form-label text-md-right">New Password</label>
                        <div class="col-md-6">
                            <input class="form-control @error('password') is-invalid @enderror" type="password" name="password" id="password">

                            @error('password')
                            <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                            @enderror
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="password_confirmation" class="col-md-4 col-form-label text-md-right">New Password Confirmation</label>
                        <div class="col-md-6">
                            <input class="form-control" type="password" name="password_confirmation" id="password_confirmation">
                        </div>
                    </div>

                    <div class="form-group row mb-0">
                        <div class="col-md-6 offset-md-4">
                            <button type="submit" class="btn btn-primary">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
