import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

type Tema = 'videojuegos' | 'anime';

interface Pregunta {
  pregunta: string;
  opciones: string[];
  correcta: number;
}

const videojuegos: Pregunta[] = [
  {
    pregunta: '¿En qué juego debes sobrevivir vigilando animatrónicos por la noche?',
    opciones: ["Five Nights at Freddy's", 'Outlast', 'Resident Evil', 'Silent Hill'],
    correcta: 0,
  },
  {
    pregunta: '¿Cuál es el Pokémon inicial de tipo Planta en la región de Kanto?',
    opciones: ['Charmander', 'Squirtle', 'Bulbasaur', 'Pikachu'],
    correcta: 2,
  },
  {
    pregunta: '¿Qué estructura necesitas construir en Minecraft para viajar al Nether?',
    opciones: ['Portal de obsidiana', 'Mesa de encantamientos', 'Faro mágico', 'Portal del End'],
    correcta: 0,
  },
  {
    pregunta: '¿Cómo se llama el protagonista de la saga God of War?',
    opciones: ['Dante', 'Kratos', 'Nathan Drake', 'Master Chief'],
    correcta: 1,
  },
  {
    pregunta: '¿En qué juego Battle Royale ganas una «Victoria Magistral»?',
    opciones: ['Apex Legends', 'Call of Duty', 'PUBG', 'Fortnite'],
    correcta: 3,
  },
];

const anime: Pregunta[] = [
  {
    pregunta: '¿Cómo se llama el cuaderno sobrenatural que encuentra Light Yagami?',
    opciones: ['Grimorio', 'Death Note', 'Libro de Clow', 'Diario del Futuro'],
    correcta: 1,
  },
  {
    pregunta: '¿Cuál es el objetivo principal de Tanjiro en Demon Slayer?',
    opciones: ['Ser Hokage', 'Encontrar el One Piece', 'Curar a su hermana Nezuko', 'Ganar el torneo'],
    correcta: 2,
  },
  {
    pregunta: '¿Qué don (Quirk) hereda Izuku Midoriya en My Hero Academia?',
    opciones: ['One For All', 'Sharingan', 'Haki', 'Nen'],
    correcta: 0,
  },
  {
    pregunta: '¿Quién es considerado el hechicero más fuerte en Jujutsu Kaisen?',
    opciones: ['Yuji Itadori', 'Megumi Fushiguro', 'Kento Nanami', 'Satoru Gojo'],
    correcta: 3,
  },
  {
    pregunta: '¿Qué objetos reúnen los personajes de Dragon Ball para invocar a Shenlong?',
    opciones: ['Frutas del Diablo', 'Las Esferas del Dragón', 'Reliquias del Milenio', 'Cartas Clow'],
    correcta: 1,
  },
];

export default function App() {
  const [pantalla, setPantalla] = useState<number>(1);
  const [tema, setTema] = useState<Tema | null>(null);
  const [indice, setIndice] = useState<number>(0);
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [correctas, setCorrectas] = useState<number>(0);
  const [incorrectas, setIncorrectas] = useState<number>(0);

  let preguntas: Pregunta[] = [];
  if (tema === 'videojuegos') {
    preguntas = videojuegos;
  } else if (tema === 'anime') {
    preguntas = anime;
  }
  const actual: Pregunta | undefined = preguntas[indice];

  function elegirTema(t: Tema) {
    setTema(t);
    setIndice(0);
    setSeleccion(null);
    setCorrectas(0);
    setIncorrectas(0);
    if (t === 'videojuegos') {
      setPantalla(3);
    } else {
      setPantalla(4);
    }
  }

  function responder(i: number) {
    if (!actual) return;
    setSeleccion(i);
    if (i === actual.correcta) {
      setCorrectas(correctas + 1);
    } else {
      setIncorrectas(incorrectas + 1);
    }
  }

  function siguiente() {
    if (indice < preguntas.length - 1) {
      setIndice(indice + 1);
      setSeleccion(null);
    } else {
      setPantalla(5);
    }
  }

  function volverAJugar() {
    setTema(null);
    setIndice(0);
    setSeleccion(null);
    setCorrectas(0);
    setIncorrectas(0);
    setPantalla(2);
  }

  if (pantalla === 1) {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.logo}>🎮</Text>
        <Text style={styles.titulo}>QuizZone</Text>
        <Text style={styles.subtitulo}>¡Demuestra cuánto sabes!</Text>
        <Button title="Comenzar" onPress={() => setPantalla(2)} />
      </View>
    );
  }

  if (pantalla === 2) {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Selecciona un tema</Text>
        <View style={styles.espacio}>
          <Button title="🎮 Videojuegos" onPress={() => elegirTema('videojuegos')} />
        </View>
        <View style={styles.espacio}>
          <Button title="🌸 Anime" onPress={() => elegirTema('anime')} />
        </View>
        <View style={styles.espacio}>
          <Button title="Atrás" color="#7a869a" onPress={() => setPantalla(1)} />
        </View>
      </View>
    );
  }

  if ((pantalla === 3 || pantalla === 4) && actual) {
    let mensaje = '';
    if (seleccion !== null) {
      if (seleccion === actual.correcta) {
        mensaje = '¡Correcto! 🎉';
      } else {
        mensaje = 'Incorrecto. La respuesta era: ' + actual.opciones[actual.correcta];
      }
    }

    return (
      <View style={styles.contenedor}>
        <Text style={styles.tema}>
          {tema === 'videojuegos' ? '🎮 Videojuegos' : '🌸 Anime'}
        </Text>
        <Text style={styles.contador}>
          Pregunta {indice + 1} de {preguntas.length} · Puntaje: {correctas}
        </Text>

        <View style={styles.tarjeta}>
          <Text style={styles.pregunta}>{actual.pregunta}</Text>
        </View>

        <View style={styles.espacio}>
          <Button
            title={'A. ' + actual.opciones[0]}
            onPress={() => responder(0)}
            disabled={seleccion !== null}
          />
        </View>
        <View style={styles.espacio}>
          <Button
            title={'B. ' + actual.opciones[1]}
            onPress={() => responder(1)}
            disabled={seleccion !== null}
          />
        </View>
        <View style={styles.espacio}>
          <Button
            title={'C. ' + actual.opciones[2]}
            onPress={() => responder(2)}
            disabled={seleccion !== null}
          />
        </View>
        <View style={styles.espacio}>
          <Button
            title={'D. ' + actual.opciones[3]}
            onPress={() => responder(3)}
            disabled={seleccion !== null}
          />
        </View>

        {seleccion !== null && (
          <View>
            <Text style={seleccion === actual.correcta ? styles.bien : styles.mal}>
              {mensaje}
            </Text>
            <Button
              title={indice < preguntas.length - 1 ? 'Siguiente' : 'Ver resultados'}
              color="#239455"
              onPress={siguiente}
            />
          </View>
        )}
      </View>
    );
  }

  let mensajeFinal = '';
  if (correctas >= 4) {
    mensajeFinal = '¡Excelente! Tienes grandes conocimientos 🏆';
  } else if (correctas >= 3) {
    mensajeFinal = '¡Muy bien! Casi lo logras 👏';
  } else {
    mensajeFinal = '¡Sigue practicando! 💪';
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.logo}>🏆</Text>
      <Text style={styles.titulo}>¡Juego terminado!</Text>

      <View style={styles.tarjeta}>
        <Text style={styles.etiqueta}>Tu puntaje</Text>
        <Text style={styles.puntaje}>
          {correctas} / {preguntas.length}
        </Text>
      </View>

      <View style={styles.fila}>
        <View style={styles.mini}>
          <Text style={styles.etiqueta}>Correctas</Text>
          <Text style={styles.miniValor}>{correctas}</Text>
        </View>
        <View style={styles.mini}>
          <Text style={styles.etiqueta}>Incorrectas</Text>
          <Text style={styles.miniValor}>{incorrectas}</Text>
        </View>
      </View>

      <Text style={styles.final}>{mensajeFinal}</Text>
      <Button title="Volver a jugar" onPress={volverAJugar} />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, justifyContent: 'center', padding: 25, backgroundColor: '#eef4ff' },
  logo: { fontSize: 64, textAlign: 'center' },
  titulo: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#173b83', marginBottom: 10 },
  subtitulo: { fontSize: 16, textAlign: 'center', color: '#596579', marginBottom: 25 },
  espacio: { marginBottom: 12 },
  tema: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#2457c5' },
  contador: { fontSize: 14, textAlign: 'center', color: '#596579', marginVertical: 8 },
  tarjeta: { backgroundColor: '#ffffff', padding: 18, borderRadius: 12, marginBottom: 16 },
  pregunta: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#202b3c' },
  bien: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#239455', marginVertical: 10 },
  mal: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#c33c3c', marginVertical: 10 },
  etiqueta: { fontSize: 14, textAlign: 'center', color: '#596579' },
  puntaje: { fontSize: 42, fontWeight: 'bold', textAlign: 'center', color: '#2457c5' },
  fila: { flexDirection: 'row', justifyContent: 'space-between' },
  mini: { width: '48%', backgroundColor: '#ffffff', padding: 14, borderRadius: 12 },
  miniValor: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#202b3c' },
  final: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginVertical: 18 },
});