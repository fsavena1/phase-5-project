class UsersController < ApplicationController

    def index 
        render json=: User.all, status: 200
    end 
    
    def show 
        user = user_find
        if user.present?
            render json: user, status: 200
        else 
            render json: {error: 'User not found'}, status: 404
        end
    end 


    def update 
        user = user_find
        user.update!(user_params)
        render json: user , status: 202
    rescue ActiveRecord::RecordInvalid => e 
        render json: {errors: e.record.errors.full_messages}, status: 406
    end 

    def create
        user = User.create!(user_params)
        render json: user, status: 201
    rescue ActiveRecord::RecordInvalid => e 
        render json: {errors: e.record.errors.full_messages}, status: 406
    end 

    def destroy
        user = find_user
        if user.present?
            user.destroy
            head :no_content
        else 
            render json: {error: "User not found"}, status: 404
        end
    end 

    private

    def user_find
        User.find_by(id: params[:id])
    end 

    def user_params 
        params.permit(:first_name, :last_name, :user_name, :email, :avatar)
       
    end 

end
