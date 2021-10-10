<div class="w-full md:w-1/2 xl:w-1/3 p-6">
    <!--Graph Card-->
    <div class="bg-white border-transparent rounded-lg shadow-xl">
        <div class="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
            <h5 class="font-bold uppercase text-gray-600">Graph</h5>
        </div>
        <div class="p-5"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
            <canvas id="chartjs-7" class="chartjs chartjs-render-monitor" width="861" height="429" style="display: block; height: 143px; width: 287px;"></canvas>
            <script>
                new Chart(document.getElementById("chartjs-7"), {
                    "type": "bar",
                    "data": {
                        "labels": ["January", "February", "March", "April"],
                        "datasets": [{
                            "label": "Page Impressions",
                            "data": [10, 20, 30, 40],
                            "borderColor": "rgb(255, 99, 132)",
                            "backgroundColor": "rgba(255, 99, 132, 0.2)"
                        }, {
                            "label": "Adsense Clicks",
                            "data": [5, 15, 10, 30],
                            "type": "line",
                            "fill": false,
                            "borderColor": "rgb(54, 162, 235)"
                        }]
                    },
                    "options": {
                        "scales": {
                            "yAxes": [{
                                "ticks": {
                                    "beginAtZero": true
                                }
                            }]
                        }
                    }
                });
            </script>
        </div>
    </div>
    <!--/Graph Card-->
</div>

  