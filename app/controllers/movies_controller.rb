class MoviesController < ApplicationController

    def create 
        movie = Movie.create!(movie_params)
        render json: movie, status: 202
    rescue ActiveRecord::RecordInvalid => e 
        render json: {errors: e.record.errors.full_messages}, status: 406
    end 


    def destroy 
        movie = find_movie
        if movie.present?
            movie.destroy
            head :no_content
        else 
            render json: {error: "Movie not found"}, status: 404
        end
    end 

    private 

    def movie_params 
        params.permit(:title, :description, :image, :rating)
    end 

    def find_movie
        Movie.find_by(id: params[:id])
    end


end
