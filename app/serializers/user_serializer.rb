class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :user_name, :email, :avatar


  has_many :reviews 
  has_many :movies, through: :reviews
end
