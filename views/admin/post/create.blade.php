@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="d-flex justify-content-center">
                    <h4>Create Post</h4>
                </div>
                <form action="{{ route('posts.store') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="form-group row">
                        <label for="head" class="col-md-4 col-form-label text-md-right">Title</label>
                        <div class="col-md-6">
                            <input class="form-control @error('head') is-invalid @enderror" type="text" name="head" id="head">

                            @error('head')
                            <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                            @enderror
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="head" class="col-md-4 col-form-label text-md-right">Subtitle</label>
                        <div class="col-md-6">
                            <input class="form-control @error('subtitle') is-invalid @enderror" type="text" name="subtitle" id="subtitle">

                            @error('subtitle')
                            <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="excerpt" class="col-md-4 col-form-label text-md-right">Excerpt</label>
                        <div class="col-md-6">
                            <textarea class="form-control @error('excerpt') is-invalid @enderror" type="text" name="excerpt" id="excerpt"></textarea>

                            @error('excerpt')
                            <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                            @enderror
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="image" class="col-md-4 col-form-label text-md-right">Image</label>
                        <div class="col-md-6">
                            <input class="form-control-file @error('image') is-invalid @enderror" type="file" name="image" id="image">
                            @error('image')
                            <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                            @enderror
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="preview_image" class="col-md-4 col-form-label text-md-right">Preview Image</label>
                        <div class="col-md-6">
                            <input class="form-control-file @error('preview_image') is-invalid @enderror" type="file"
                                   name="preview_image" id="preview_image">
                            @error('image')
                            <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                            @enderror
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="tags" class="col-md-4 col-form-label text-md-right">Tags</label>
                        <div class="col-md-6">
                            <select class="selectpicker @error('tags') is-invalid @enderror" multiple title="Choose tags" name="tags[]" id="tags">
                                @foreach(\App\Tag::all() as $tag)
                                    <option value="{{ $tag->id }}">{{ $tag->name }}</option>
                                @endforeach
                            </select>
                            @error('tags')
                            <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                            @enderror
                        </div>
                    </div>

                    @error('body')
                    <br>
                    <div class="alert-danger">
                        {{ $message }}
                    </div>
                    <br>
                    @enderror
                    <div class="form-group row">
                        <label for="mins_to_read" class="col-md-4 col-form-label text-md-right">Minutes To Read</label>
                        <div class="col-md-6">
                            <input class="form-control @error('mins_to_read') is-invalid @enderror" type="number" name="mins_to_read" id="mins_to_read">
                            @error('mins_to_read')
                            <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                            @enderror
                        </div>
                    </div>

                    <textarea class="form-control" type="text" name="body" id="body"></textarea>
                    <br>

                    <div class="form-group row mb-0">
                        <div class="col-md-6 offset-md-4">
                            <button type="submit" class="btn btn-primary">Create</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection

@section('imports')
    <!-- include summernote css/js -->
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/i18n/defaults-*.min.js"></script>
@endsection

@section('scripts')
    <script>
        $(document).ready(function () {
            $('#body').summernote({
                height: 450
            });
        });
    </script>
@endsection
