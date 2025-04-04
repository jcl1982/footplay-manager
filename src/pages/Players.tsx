
                  <input
                    type="number"
                    className="border rounded p-1 w-full"
                    value={editingPlayer.number || ''}
                    onChange={(e) => setEditingPlayer({...editingPlayer, number: Number(e.target.value)})}
                  />
