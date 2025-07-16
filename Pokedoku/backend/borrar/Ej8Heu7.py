import numpy as np
import matplotlib.pyplot as plt

# Frecuencia central de las emisoras
emisoras = [89.1e6, 89.3e6, 89.5e6]  # Frecuencias en Hz
BW_FM = 200e3  # Ancho de banda de cada emisora en Hz
delta_f = 75e3  # Desviación de frecuencia máxima en Hz

# Generar frecuencias de los bordes de cada emisora
frecuencia_min = [f - delta_f for f in emisoras]
frecuencia_max = [f + delta_f for f in emisoras]

# Graficar el espectro de frecuencia
plt.figure(figsize=(10, 5))
for i in range(len(emisoras)):
    plt.plot([frecuencia_min[i], frecuencia_max[i]], [1, 1], label=f"Emisora en {emisoras[i]/1e6} MHz")

plt.xlabel("Frecuencia (MHz)")
plt.ylabel("Amplitud relativa")
plt.title("Espectro de Frecuencia de Tres Emisoras FM Contiguas")
plt.legend()
plt.grid()
plt.show()
