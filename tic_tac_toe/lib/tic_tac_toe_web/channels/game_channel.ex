defmodule TicTacToeWeb.GameChannel do
  use TicTacToeWeb, :channel

  @impl true
  def join("game:lobby", payload, socket) do
    if authorized?(payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def join("game:" <> _game_id, payload, socket) do
    if authorized?(payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  @impl true
  def handle_in("check_square", %{"square" => square}, socket) do
    broadcast(socket, "square_checked", %{square: "square_" <> square})

    {:reply, {:ok, square}, socket}
  end

  @impl true
  def handle_in("shout", payload, socket) do
    broadcast(socket, "shout", payload)
    {:noreply, socket}
  end

  defp authorized?(_payload) do
    true
  end
end
