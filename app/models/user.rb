class User < ApplicationRecord

    has_many :movies 
    
    has_many :reviews 
    has_many :movies, through: :reviews
    accepts_nested_attributes_for :movies, :reviews

    has_secure_password
end
