@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="d-flex justify-content-center">
                    <h4>Post CMS</h4>
                </div>
                <div class="d-flex justify-content-center">
                    <a class="btn btn-primary align-self-end" href="{{ route('posts.create') }}">Create New Post</a>
                </div>
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Views</th>
                        <th scope="col">Tags</th>
                        <th scope="col">Publish status</th>
                        <th scope="col">Toggle Publish</th>
                        <th scope="col">Edit</th>
                        <th scope="col">View</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach(\App\Post::all() as $post)
                    <tr>
                        <th scope="row">{{ $post->id }}</th>
                        <td>{{ $post->head }}</td>
                        <td>{{ $post->views }}</td>
                        <td>{{ $post->tags->map(function (\App\Tag $tag) {
                            return $tag->name;
                        })->implode(',') }}</td>
                        <td>@if($post->public)<span class="badge badge-success">Published</span>@else<span class="badge badge-danger">Unpublished</span>@endif</td>
                        <td>@if($post->public) <a class="btn btn-danger" href="{{ route('posts.unpublish', [ 'post' => $post->slug ]) }}">Unpublish</a> @else <a class="btn btn-success" href="{{ route('posts.publish', [ 'post' => $post->slug ]) }}">Publish</a> @endif</td>
                        <td><a href="{{ route('posts.edit', [ 'post' => $post->slug ]) }}" class="btn btn-warning">Edit</a></td>
                        <td><a href="{{ $post->url }}" class="btn btn-primary">Show</a></td>
                    </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection
