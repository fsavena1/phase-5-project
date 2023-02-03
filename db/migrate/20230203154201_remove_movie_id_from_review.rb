class RemoveMovieIdFromReview < ActiveRecord::Migration[6.1]
  def change
    remove_column :reviews, :movie_id
  end
end
