<template>
  <base-survey>
    <div class="block">
      Rifletti con calma su <b>Tutte le prove che hai svolto</b> e suoi tuoi
      stati d'animo. Ti chiediamo di rispondere alle seguenti domande,
      trascinando con il mouse il circoletto centrale nella direzione voluta.
    </div>
  </base-survey>
</template>

<script>
import survey from "@/views/tasks/task-survey";

export default {
  // name
  name: "srv-survey",

  // components
  components: {
    baseSurvey: survey,
  },
};
</script>
