@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="d-flex justify-content-center">
                    <h4>Tag Manager</h4>
                </div>
                <div class="d-flex justify-content-center">
                    <a class="btn btn-primary align-self-end" href="{{ route('tags.create') }}">Create New Tag</a>
                </div>
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach(\App\Tag::all() as $tag)
                    <tr>
                        <th scope="row">{{ $tag->id }}</th>
                        <td>{{ $tag->name }}</td>
                        <td><a href="{{ route('tags.edit', [ 'tag' => $tag->id ]) }}" class="btn btn-warning">Edit</a></td>
                        <td>
                            <a href="{{ route('tags.destroy', [ 'tag' => $tag->id ]) }}" class="btn btn-danger" onclick="event.preventDefault();
                                                     document.getElementById('tag-destroy-{{ $tag->id }}').submit();">Delete</a>

                            <form id="tag-destroy-{{ $tag->id }}" action="{{ route('tags.destroy', [ 'tag' => $tag->id ]) }}" method="POST" style="display: none;">
                                @csrf
                                @method('DELETE')
                            </form>
                        </td>
                    </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection
