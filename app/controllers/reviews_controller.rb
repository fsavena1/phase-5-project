class ReviewsController < ApplicationController

    def index 
        render json: Review.all, status: 200 
    end 

    def show 
        review = find_review
        if review.present? 
            render json: review, status: 200
        else
            render json: {error: "Review not found"}, status: 404
        end 
    end 

    def update
        review = find_review
        review.update!(review_params)
        render json: review, status: 202
    rescue ActiveRecord::RecordInvalid => e 
        render json: {errors: e.record.errors.full_messages}, status: 406
    end

    def create
        review = Review.create!(review_params)
        render json: review, status: 202
    rescue ActiveRecord::RecordInvalid => e 
        render json: {errors: e.record.errors.full_messages}, status: 406
    end 

    def destroy
        review = find_review
        if review.present?
            review.destroy
            head :no_content
        else 
            render json: {error: "Review Not found"}, status 404
        end 
    end 

    private 

    def review_params
        params.permit(:body, :user_id, :movie_id)
    end 

    def find_review 
        Review.find_by(id: params[:id])
    end 


end
