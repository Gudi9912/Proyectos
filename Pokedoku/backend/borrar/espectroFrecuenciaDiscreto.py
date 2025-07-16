import matplotlib.pyplot as plt

# Frecuencias de las armónicas (múltiplos impares de la fundamental)
frequencies_discrete = [50, 150, 250, 350, 450]
amplitudes_discrete = [1.27, 0.42, 0.25, 0.18, 0.14]

# Graficar espectro discreto
plt.stem(frequencies_discrete, amplitudes_discrete)
plt.xlabel('Frecuencia (Hz)')
plt.ylabel('Amplitud (V)')
plt.title('Espectro Discreto de una Señal Periódica')
plt.grid(True)
plt.show()
