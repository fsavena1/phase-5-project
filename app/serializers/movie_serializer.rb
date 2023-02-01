class MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :image, :rating


  belongs_to :user 
  has_many :reviews 
  # has_many :users, through: :reviews
end
