class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :body, :user 
  has_one :user

end
